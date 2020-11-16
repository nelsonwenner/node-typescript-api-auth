import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { authMiddleware } from '@src/app/middlewares/auth.middleware';
import { UserRepository } from '@src/app/repositories/user.repository';
import AuthService  from '@src/app/services/auth.service';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { User } from '@src/app/models/users';

@Controller('users')
export class UserController extends BaseController{
  @Post('')
  public async store(req: Request, res: Response): Promise<void> {
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

  @Get('')
  @Middleware([authMiddleware])
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.user.id);
      const userSerializer = { ...user?.toJSON() }
      delete userSerializer.password;
      res.status(200).send(userSerializer);
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