import { UserRepository } from '@src/app/repositories/user.repository';
import { Controller, Post } from '@overnightjs/core';
import AuthService  from '@src/app/services/auth';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';


@Controller('users')
export class UserController extends BaseController{
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = UserRepository.create(req.body);
      const newUser = await user.save();

      const userSerializer = {...newUser.toJSON() }
      
      delete userSerializer.password;
      
      res.status(201).send(userSerializer);
    } catch (error) {
      this.sendCreatedUpdateErrorResponse(res, error);
    }
  }

  @Post('auth')
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const user = await UserRepository.getUser(req.body.email);
    if (!user) {
      return res.status(401).send({
        code: 401,
        error: 'User not found!',
      });
    }
    if (
      !(await AuthService.comparePassword(req.body.password, user.password))
    ) {
      return res
        .status(401)
        .send({ code: 401, error: 'Password does not match!' });
    }
    const token = AuthService.generateToken({id: user.id, email: user.email});

    const userSerializer = {...user.toJSON() }

    delete userSerializer.password;

    return res.send({ ...userSerializer, ...{ token } });
  }
}