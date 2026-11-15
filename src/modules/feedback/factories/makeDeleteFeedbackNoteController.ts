import { DeleteFeedbackNoteController } from "../controllers/deleteFeedbackNoteController";
import { PrismaFeedbackNoteRepository } from "../repositories/PrismaFeedbackNoteRepository";
import { DeleteFeedbackNoteUseCase } from "../useCases/deleteFeedbackNoteUseCase";

export function makeDeleteFeedbackNoteController() {
  const repository = new PrismaFeedbackNoteRepository();
  const useCase = new DeleteFeedbackNoteUseCase(repository);

  return new DeleteFeedbackNoteController(useCase);
}
