import { Response } from "../helper/response.js";
import { decodeToken } from "../helper/token.js";
import { ERROR, ROLE, SUCCESS } from "../helper/constant.js";

export class VerifyController {
  constructor(conn, studentRepository, userRepository, tokenRepository) {
    this.conn = conn;
    this.studentRepository = studentRepository;
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  verifyEmail = async (req, res) => {
    const session = await this.conn.startSession();
    try {
      const { token } = req.params;

      const tokenDb = await this.tokenRepository.find({ token: token });
      if (!tokenDb) {
        return Response.error(res, ERROR.TokenNotExist);
      }
      const decode = await decodeToken(token, process.env.VERIFY_KEY);

      const checkToken = await this.tokenRepository.find({
        email: decode.email,
      });
      if (!checkToken) {
        return Response.error(res, ERROR.TokenNotExist);
      }

      session.startTransaction();
      const newUser = await this.userRepository.store(
        decode.email,
        decode.fullName,
        decode.password,
        ROLE.STUDENT,
        session
      );
      if (!newUser) {
        await session.abortTransaction();
        return Response.error(res, ERROR.VerificationFailed);
      }

      const newStudent = await this.studentRepository.store(
        newUser._id,
        decode.phoneNumber,
        decode.gender,
        session
      );
      if (!newStudent) {
        await session.abortTransaction();
        return Response.error(res, ERROR.VerificationFailed);
      }

      await session.commitTransaction();
      return Response.success(res, SUCCESS.Verification);
    } catch (err) {
      return Response.error(res, err);
    } finally {
      session.endSession();
    }
  };
}
