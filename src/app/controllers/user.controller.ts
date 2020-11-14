import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  @Post('')
  public create(req: Request, res: Response): void {
    res.status(201).send({});
  }
}
