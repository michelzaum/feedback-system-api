import { GetProjectFeedbacksController } from "../controllers/getProjectFeedbacksController";
import { PrismaFeedbackRepository } from "../repositories/PrismaFeedbackRepository";
import { GetProjectFeedbacksUseCase } from "../useCases/getProjectFeedbacksUseCase";

export function makeGetProjectFeedbacksController() {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getProjectFeedbacksUseCase = new GetProjectFeedbacksUseCase(prismaFeedbackRepository);

  return new GetProjectFeedbacksController(getProjectFeedbacksUseCase);
}
