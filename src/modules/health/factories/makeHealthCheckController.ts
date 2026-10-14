import { HealthCheckController } from '../controllers/healthCheckController';
import { HealthCheckUseCase } from '../useCases/healthCheckUseCase';

export function makeHealthCheckController() {
  const healthCheckUseCase = new HealthCheckUseCase();
  return new HealthCheckController(healthCheckUseCase);
}
