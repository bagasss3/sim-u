export const ERROR = {
  WrongEmailorPassword: "Email or Password Incorrect",
  PasswordNotMatch: "Password not match",
  EmailRegistered: "Email already registered",
  PhoneNumberRegistered: "Phone number already registered",
  InternalServer: "Internal Server Error",
  RefreshTokenNotFound: "Refresh Token Not Found",
  UserNotFound: "User does not exist",
  LoginRequired: "Login Required",
  TokenNotExist: "Token not exist",
  VerificationFailed: "Verification Failed",
  NotAllowed: "NotAllowed",
};

export const SUCCESS = {
  Login: "Login Success",
  Register: "Check email for verification",
  RegisterOrmawa: "Success create ormawa",
  RefreshToken: "Success Refresh Token",
  Verification: "Success Verification Account",
};

export const ROLE = {
  ADMIN: 0,
  ORMAWA: 1,
  STUDENT: 2,
};
