import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import "dotenv/config";

import {
  Token,
  User,
  Student,
  Session,
  Ormawa,
} from "./internal/model/models.js";
import {
  SessionRepository,
  StudentRepository,
  UserRepository,
  TokenRepository,
  OrmawaRepository,
} from "./internal/repository/repositories.js";
import {
  AuthController,
  SessionController,
  UserController,
  VerifyController,
  StudentController,
  AdminController,
} from "./internal/controller/controllers.js";
import { Service } from "./internal/http/http.js";
import { conn } from "./internal/database/mongodb.js";
import { passportInit } from "./internal/helper/passport.js";

const app = express();

//Express middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: "Not allowed to access this resource",
    });
  }
  return next();
});

//Depedency Injection
const sessionRepository = new SessionRepository(Session);
const tokenRepository = new TokenRepository(Token);
const userRepository = new UserRepository(User);
const studentRepository = new StudentRepository(Student);
const ormawaRepository = new OrmawaRepository(Ormawa);
const sessionController = new SessionController(
  userRepository,
  sessionRepository
);
const userController = new UserController(userRepository, studentRepository);
const adminController = new AdminController(
  conn,
  userRepository,
  ormawaRepository
);
const studentController = new StudentController(
  studentRepository,
  userRepository,
  tokenRepository
);
const verifyController = new VerifyController(
  conn,
  studentRepository,
  userRepository,
  tokenRepository
);
const authController = new AuthController(userRepository, sessionRepository);
const httpsvc = new Service(
  app,
  userController,
  studentController,
  verifyController,
  authController,
  sessionController,
  adminController
);
passportInit(passport, userRepository);
httpsvc.init();

//Open database connection
//Start server
conn.on("open", () => {
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
  });
});

conn.on("error", () => console.log("Database not connected"));
