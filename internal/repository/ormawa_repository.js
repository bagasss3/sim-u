export class OrmawaRepository {
  constructor(Ormawa) {
    this.Ormawa = Ormawa;
  }
  store = (user_id, session) => {
    const newOrmawa = new this.Ormawa({
      user_id,
    }).save({ session });
    return newOrmawa;
  };

  find = (condition) => {
    const ormawa = this.Ormawa.findOne(condition);
    return ormawa;
  };
}
