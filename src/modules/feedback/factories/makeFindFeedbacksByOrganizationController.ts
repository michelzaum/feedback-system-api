import { FindFeedbacksByOrganizationController } from "../controllers/findFeedbacksByOrganizationController";
import { PrismaFeedbackRepository } from "../repositories/PrismaFeedbackRepository";
import { FindFeedbacksByOrganizationUseCase } from "../useCases/findFeedbacksByOrganizationUseCase";

export function makeFindFeedbacksByOrganizationController() {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const findFeedbacksByOrganizationUseCase = new FindFeedbacksByOrganizationUseCase(prismaFeedbackRepository);

  return new FindFeedbacksByOrganizationController(findFeedbacksByOrganizationUseCase);
}
