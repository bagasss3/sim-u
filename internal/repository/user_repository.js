export class UserRepository {
  constructor(User) {
    this.User = User;
  }
  store = (email, name, password, role_id, session) => {
    const newUser = new this.User({
      email,
      name,
      password,
      role_id,
    }).save({ session });

    return newUser;
  };

  storeNoTransaction = (email, name, password, role_id) => {
    const newUser = new this.User({
      email,
      name,
      password,
      role_id,
    }).save();

    return newUser;
  };

  find = (condition) => {
    const user = this.User.findOne(condition);
    return user;
  };
}
