import { CreateFeedbackController } from "../controllers/createFeedbackController";
import { PrismaFeedbackRepository } from "../repositories/PrismaFeedbackRepository";
import { CreateFeedbackUseCase } from "../useCases/createFeedbackUseCase";

export function makeCreateFeedbackController() {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const createFeedbackUseCase = new CreateFeedbackUseCase(prismaFeedbackRepository);

  return new CreateFeedbackController(createFeedbackUseCase);
}
