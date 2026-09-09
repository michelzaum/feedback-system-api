import { GetFeedbackController } from "../controllers/getFeedbackController";
import { PrismaFeedbackRepository } from "../repositories/PrismaFeedbackRepository";
import { GetFeedbackUseCase } from "../useCases/getFeedbackUseCase";

export function makeGetFeedbackController() {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbackRepository);

  return new GetFeedbackController(getFeedbackUseCase);
}
