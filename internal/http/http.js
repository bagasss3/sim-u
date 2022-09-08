import { userAuth } from "../middleware/userAuth.js";

export class Service {
  constructor(
    app,
    userController,
    studentController,
    verifyController,
    authController,
    sessionController,
    adminController
  ) {
    this.app = app;
    this.userController = userController;
    this.studentController = studentController;
    this.verifyController = verifyController;
    this.authController = authController;
    this.sessionController = sessionController;
    this.adminController = adminController;
  }

  init = () => {
    //Student Controller
    this.app.post("/register", this.studentController.register);

    //VerifyController
    this.app.post("/verification/:token", this.verifyController.verifyEmail);

    //AuthController
    this.app.post("/login", this.authController.login);

    //UserController
    this.app.get("/profile", userAuth, this.userController.profile);

    //SessionController
    this.app.post("/refresh-token", this.sessionController.refreshToken);

    //AdminController
    this.app.post("/ormawa", userAuth, this.adminController.createOrmawa);
    this.app.post("/admin", this.adminController.createAdmin);
  };
}
