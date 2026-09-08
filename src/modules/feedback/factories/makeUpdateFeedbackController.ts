import { UpdateFeedbackController } from "../controllers/updateFeedbackController";
import { PrismaFeedbackRepository } from "../repositories/PrismaFeedbackRepository";
import { UpdateFeedbackUseCase } from "../useCases/updateFeedbackUseCase";

export function makeUpdateFeedbackController() {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const updateFeedbackUseCase = new UpdateFeedbackUseCase(prismaFeedbackRepository);

  return new UpdateFeedbackController(updateFeedbackUseCase);
}
