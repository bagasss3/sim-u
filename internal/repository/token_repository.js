export class TokenRepository {
  constructor(Token) {
    this.Token = Token;
  }
  store = (email, token) => {
    const newToken = new this.Token({
      email,
      token,
    }).save();
    return newToken;
  };

  find = (condition) => {
    const token = this.Token.findOne(condition);
    return token;
  };
}
