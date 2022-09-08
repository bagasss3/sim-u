export class SessionRepository {
  constructor(Session) {
    this.Session = Session;
  }
  store = (user_id, refresh_token, expired_at) => {
    const newSession = new this.Session({
      user_id,
      refresh_token,
      refresh_token_expired_at: expired_at,
    }).save();
    return newSession;
  };
  find = (condition) => {
    const session = this.Session.findOne(condition);
    return session;
  };
  update = (condition, update) => {
    const updateSession = this.Session.updateOne(condition, update);
    return updateSession;
  };
}
