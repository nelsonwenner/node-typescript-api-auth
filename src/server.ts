import { UserController } from './app/controllers/user.controller';
import Express, { Application } from 'express';
import { Server } from '@overnightjs/core';
import './utils/module-alias';


export class SetupServer extends Server {

  constructor(private port = 3333) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(Express.json());
  }

  private setupControllers (): void {
    const userController = new UserController();
    this.addControllers([
      userController
    ])
  }

  public getApp(): Application {
    return this.app;
  }
}