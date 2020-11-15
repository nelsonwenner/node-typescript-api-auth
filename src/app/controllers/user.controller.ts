import { UserRepository } from '@src/app/repositories/user.repository';
import { Controller, Post } from '@overnightjs/core';;
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const user = UserRepository.create(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  }
}
