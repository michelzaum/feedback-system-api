import { prisma } from '../../../lib/prisma';
import type { IUseCase } from '../../../shared/interfaces/IUseCase';
import type { IHealthCheck } from '../interfaces/IHealthCheck';
import { BaseUseCase } from '../../../shared/useCases/BaseUseCase';

export class HealthCheckUseCase extends BaseUseCase<void, IHealthCheck> {
  constructor() {
    super();
  }

  protected async executeInternal(): Promise<IHealthCheck> {
    const timestamp = new Date().toISOString();
    const uptimeSeconds = Math.floor(process.uptime());

    try {
      await prisma.$queryRaw`SELECT 1`;

      return { status: 'ok', database: 'up', timestamp, uptimeSeconds };
    } catch {
      return { status: 'error', database: 'down', timestamp, uptimeSeconds };
    }
  }
}
