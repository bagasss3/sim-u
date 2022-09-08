import jwt from "jsonwebtoken";

export const createToken = (payload, secretKey, expires) => {
  const opt = {
    algorithm: "HS256",
    expiresIn: expires,
  };
  return jwt.sign(payload, secretKey, opt);
};

export const decodeToken = (token, secretKey) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
