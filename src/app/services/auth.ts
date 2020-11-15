import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export default class AuthService {
  public static async hashPassword(
      password: string, 
      salt = 10
    ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string, 
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: Object): string {
    return jwt.sign(payload, `${process.env.SECRET_KEY}`, {
      expiresIn: `${process.env.EXPIRATION_TIME}`
    });
  }
}