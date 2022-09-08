import bcrypt from "bcrypt";
import { valLogin } from "../helper/validation.js";
import { Response } from "../helper/response.js";
import { createToken } from "../helper/token.js";
import { ERROR, SUCCESS } from "../helper/constant.js";

export class AuthController {
  constructor(userRepository, sessionRepository) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = valLogin.validate(req.body);
      if (result.error) {
        return Response.error(res, result.error.details[0].message);
      }

      const user = await this.userRepository.find({ email: email });
      if (!user) {
        return Response.error(res, ERROR.WrongEmailorPassword);
      }
      const valPass = await bcrypt.compare(password, user.password);
      if (!valPass) {
        return Response.error(res, ERROR.WrongEmailorPassword);
      }
      const payload = {
        email: user.email,
        role: user.role_id,
      };

      const refreshToken = createToken(
        payload,
        process.env.VERIFY_KEY_REFRESH,
        process.env.REFRESH_TOKEN_EXPIRES
      );
      const accessToken = createToken(
        payload,
        process.env.VERIFY_KEY,
        process.env.ACCESS_TOKEN_EXPIRES
      );
      const date = new Date();
      const expiredAt = date.setDate(date.getDate() + 5);
      const newSession = await this.sessionRepository.store(
        user._id,
        refreshToken,
        expiredAt
      );
      if (!newSession) {
        return Response.error(res, ERROR.InternalServer);
      }
      return Response.success(res, SUCCESS.Login, {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (err) {
      return Response.error(res, err);
    }
  };
}
