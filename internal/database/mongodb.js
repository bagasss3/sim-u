import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  maxIdleTimeMS: 300000,
});

export const conn = mongoose.connection;
