import { valCreateOrmawa } from "../helper/validation.js";
import { Response } from "../helper/response.js";
import { Generate } from "../helper/generator.js";
import { ERROR, SUCCESS, ROLE } from "../helper/constant.js";
import bcrypt from "bcrypt";

export class AdminController {
  constructor(conn, userRepository, ormawaRepository) {
    this.conn = conn;
    this.userRepository = userRepository;
    this.ormawaRepository = ormawaRepository;
  }

  createOrmawa = async (req, res) => {
    const session = await this.conn.startSession();
    try {
      if (req.user.role_id != ROLE.ADMIN) {
        return Response.error(res, ERROR.NotAllowed);
      }
      const { email, name } = req.body;
      const result = valCreateOrmawa.validate(req.body);
      if (result.error) {
        return Response.error(res, result.error.details[0].message);
      }

      const findEmail = await this.userRepository.find({
        email: email,
      });
      if (findEmail) {
        return Response.error(res, ERROR.EmailRegistered);
      }

      const generatePassword = Generate();
      const hashPassword = await bcrypt.hash(
        generatePassword,
        Number(process.env.SALT)
      );

      session.startTransaction();
      const newUser = await this.userRepository.store(
        email,
        name,
        hashPassword,
        ROLE.ORMAWA,
        session
      );
      if (!newUser) {
        await session.abortTransaction();
        return Response.error(res, ERROR.VerificationFailed);
      }

      const newOrmawa = this.ormawaRepository.store(newUser._id);
      if (!newOrmawa) {
        await session.abortTransaction();
        return Response.error(res, ERROR.VerificationFailed);
      }
      console.log("what");
      await session.commitTransaction();
      return Response.success(res, SUCCESS.RegisterOrmawa, {
        email: email,
        password: generatePassword,
      });
    } catch (err) {
      return Response.error(res, err);
    } finally {
      session.endSession();
    }
  };

  createAdmin = async (req, res) => {
    const { email, name, password, repassword } = req.body;
    const findEmail = await this.userRepository.find({
      email: email,
    });

    if (password !== repassword) {
      return Response.error(res, ERROR.PasswordNotMatch);
    }

    if (findEmail) {
      return Response.error(res, ERROR.EmailRegistered);
    }
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
    const newUser = await this.userRepository.storeNoTransaction(
      email,
      name,
      hashPassword,
      ROLE.ADMIN
    );
    if (!newUser) {
      await session.abortTransaction();
      return Response.error(res, ERROR.InternalServer);
    }
    return Response.success(res, "Success create admin");
  };
}
