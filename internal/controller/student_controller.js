import bcrypt from "bcrypt";
import { valRegisStudent } from "../helper/validation.js";
import { Response } from "../helper/response.js";
import { createToken } from "../helper/token.js";
import { ERROR, SUCCESS } from "../helper/constant.js";

export class StudentController {
  constructor(studentRepository, userRepository, tokenRepository) {
    this.studentRepository = studentRepository;
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  register = async (req, res) => {
    try {
      const { email, fullName, phoneNumber, password, repassword, gender } =
        req.body;
      const result = valRegisStudent.validate(req.body);
      if (result.error) {
        return Response.error(res, result.error.details[0].message);
      }

      if (password !== repassword) {
        return Response.error(res, ERROR.PasswordNotMatch);
      }

      const findEmail = await this.userRepository.find({
        email: email,
      });
      if (findEmail) {
        return Response.error(res, ERROR.EmailRegistered);
      }

      const findPhoneStudent = await this.studentRepository.find({
        phone_number: phoneNumber,
      });
      if (findPhoneStudent) {
        return Response.error(res, ERROR.PhoneNumberRegistered);
      }

      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT)
      );

      const token = createToken(
        {
          email,
          fullName,
          password: hashPassword,
          phoneNumber,
          gender,
        },
        process.env.VERIFY_KEY,
        process.env.ACCESS_TOKEN_EXPIRES
      );

      const newToken = await this.tokenRepository.store(email, token);
      if (!newToken) {
        return Response.error(res, ERROR.InternalServer);
      }

      return Response.success(res, SUCCESS.RegisterSuccess, newToken);
    } catch (err) {
      return Response.error(res, err);
    }
  };
}
