import jwt from "jsonwebtoken";
import { decrypt, encrypt } from "./crypto.js";

export default class {
  static generateAccessToken(_id: Object) {
    const accessTokenExpiresIn = process.env.NODE_ENV === "production" ? "3d" : "1d"
    const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString();
    let token = jwt.sign({_id}, privateKey, { expiresIn: accessTokenExpiresIn, algorithm: "HS256", });
    token = encrypt(token);
    return token;
  }

  static generateRefreshToken(_id: Object) {
    const refreshTokenExpiresIn = process.env.NODE_ENV === "production" ? "10d" : "5d"
    const privateKey = Buffer.from(process.env.REFRESH_SECRET_KEY, "base64").toString();
    let token = jwt.sign({_id}, privateKey, { expiresIn: refreshTokenExpiresIn, algorithm: "HS256", });
    token = encrypt(token);
    return token;
  }

  static verifyAccessToken(token: string) {
    token = decrypt(token);
    const publicKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString();
    const decoded = jwt.verify(token, publicKey);

    return decoded;
  }

  static verifyRefreshToken(token: string) {
    token = decrypt(token);
    const publicKey = Buffer.from(process.env.REFRESH_SECRET_KEY, "base64").toString();
    const decoded = jwt.verify(token, publicKey);

    return decoded;
  }

  static decode(token: string) {
    token = decrypt(token);
    const decoded = jwt.decode(token, { json: true, complete: false });
    return decoded;
  }

  // static isTokenExpired(exp: number): boolean {
  //   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //   return exp < currentTime;
  // }
} 