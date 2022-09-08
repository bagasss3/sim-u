import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import { Response } from "../helper/response.js";
import { ERROR, SUCCESS } from "../helper/constant.js";

export class UserController {
  constructor(userRepository, studentRepository) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
  }

  profile = async (req, res) => {
    try {
      const { user } = req;
      const findUser = await this.userRepository.find({ email: user.email });
      if (!findUser) {
        return Response.error(res, ERROR.UserNotFound);
      }
      let profile;
      switch (user.role_id) {
        case 2:
          profile = await this.studentRepository.find({
            user_id: new ObjectId(user.id),
          });
          break;
        default:
          profile = null;
      }

      return Response.success(res, "Profile", {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role_id,
        ...profile,
      });
    } catch (err) {
      return Response.error(res, err);
    }
  };
}
