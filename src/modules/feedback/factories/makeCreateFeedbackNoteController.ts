import { CreateFeedbackNoteController } from "../controllers/createFeedbackNoteController";
import { PrismaFeedbackNoteRepository } from "../repositories/PrismaFeedbackNoteRepository";
import { CreateFeedbackNoteUseCase } from "../useCases/createFeedbackNoteUseCase";

export function makeCreateFeedbackNoteController() {
  const repository = new PrismaFeedbackNoteRepository();
  const useCase = new CreateFeedbackNoteUseCase(repository);

  return new CreateFeedbackNoteController(useCase);
}
