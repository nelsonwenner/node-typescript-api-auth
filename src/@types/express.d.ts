/*
  Overriding Express typing
 */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}