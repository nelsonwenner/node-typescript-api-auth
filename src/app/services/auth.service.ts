import { User } from '@src/app/models/users';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
  email: string;
}

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

  public static generateToken(payload: object): string {
    return jwt.sign(payload, `${process.env.SECRET_KEY}`, {
      expiresIn: `${process.env.EXPIRATION_TIME}`
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, `${process.env.SECRET_KEY}`) as DecodedUser;
  }
}