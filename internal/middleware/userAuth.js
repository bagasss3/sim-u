import passport from "passport";
import { Response } from "../helper/response.js";
import { ERROR } from "../helper/constant.js";

export const userAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return Response.error(res, err);
    }
    if (!user) {
      return Response.error(res, ERROR.LoginRequired);
    }

    req.user = user;
    return next();
  })(req, res, next);
};
