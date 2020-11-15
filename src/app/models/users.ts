import mongoose, { Document, Model } from 'mongoose';

export interface User {
  _id?:string;
  email: string;
  password: string;
}

interface UserModel extends Omit<User, '_id'>, Document { }

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique']
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    timestamps: true,
    versionKey: false,
  }
);

export const user: Model<UserModel> = mongoose.model('User', schema);