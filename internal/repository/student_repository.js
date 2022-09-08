export class StudentRepository {
  constructor(Student) {
    this.Student = Student;
  }
  store = (user_id, phone_number, gender, session) => {
    const newStudent = new this.Student({
      user_id,
      phone_number,
      gender,
    }).save({ session });
    return newStudent;
  };

  find = (condition) => {
    const student = this.Student.findOne(condition);
    return student;
  };
}
