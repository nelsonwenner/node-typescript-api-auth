import mongoose, { Mongoose } from 'mongoose';
import 'dotenv/config';

const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DATABASE = process.env.MONGO_DATABASE;
const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;

const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`;

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();