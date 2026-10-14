import type { Request, Response } from 'express';
import type { HealthCheckUseCase } from '../useCases/healthCheckUseCase';

export class HealthCheckController {
  constructor(private readonly healthCheckUseCase: HealthCheckUseCase) { }

  async handle(_request: Request, response: Response) {
    const health = await this.healthCheckUseCase.execute();

    const statusCode = health.status === 'ok' ? 200 : 503;

    response.status(statusCode).json(health);
  }
}
