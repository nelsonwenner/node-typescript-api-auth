import { User } from '@src/app/models/users';
import { Document } from 'mongoose';

interface userData {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Omit<User, '_id'>, Document { }

export class UserRepository {
  public static create = (data: userData): UserModel => {
    return new User(data);
  }
}