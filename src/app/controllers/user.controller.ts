import { UserRepository } from '@src/app/repositories/user.repository';
import { Controller, Post } from '@overnightjs/core';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';

@Controller('users')
export class UserController extends BaseController{
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = UserRepository.create(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      this.sendCreatedUpdateErrorResponse(res, error);
    }
  }
}