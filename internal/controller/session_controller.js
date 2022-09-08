import { Response } from "../helper/response.js";
import { createToken } from "../helper/token.js";
import { ERROR, SUCCESS } from "../helper/constant.js";

export class SessionController {
  constructor(userRepository, sessionRepository) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  refreshToken = async (req, res) => {
    try {
      const { refresh_token } = req.body;
      const session = await this.sessionRepository.find({
        refresh_token: refresh_token,
      });
      if (!session) {
        return Response.error(res, ERROR.RefreshTokenNotFound);
      }

      const user = await this.userRepository.find({
        id: session.user_id,
      });
      if (!user) {
        return Response.error(res, ERROR.UserNotFound);
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

      const updateSession = this.sessionRepository.update(
        {
          id: session.id,
        },
        {
          refresh_token: refreshToken,
          refresh_token_expired: expiredAt,
        }
      );
      if (!updateSession) {
        return Response.error(res, ERROR.InternalServer);
      }

      return Response.success(res, SUCCESS.RefreshToken, {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (err) {
      return Response.error(res, err);
    }
  };
}
