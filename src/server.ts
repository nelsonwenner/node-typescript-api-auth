import './utils/module-alias';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { UserController } from './app/controllers/user.controller';
import { OpenApiValidator } from 'express-openapi-validator';
import * as database from '@src/config/database';
import Express, { Application } from 'express';
import expressPino from 'express-pino-logger';
import { Server } from '@overnightjs/core';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api.schema.json';
import logger from './logger';
import cors from 'cors';

export class SetupServer extends Server {
  constructor(private port = 3333) {
    super();
  }
  
  public async init(): Promise<void> {
    this.setupExpress();
    await this.docsSetup();
    this.setupControllers();
    await this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(expressPino({logger}));
    this.app.use(cors({origin: '*'}));
  }
  
  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    await new OpenApiValidator({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
  }

  private setupControllers(): void {
    const userController = new UserController();
    this.addControllers([
      userController
    ]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`\nServer start with successfully on PORT ${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
