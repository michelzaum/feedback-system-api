import { GetFeedbackNotesController } from "../controllers/getFeedbackNotesController";
import { PrismaFeedbackNoteRepository } from "../repositories/PrismaFeedbackNoteRepository";
import { GetFeedbackNotesUseCase } from "../useCases/getFeedbackNotesUseCase";

export function makeGetFeedbackNotesController() {
  const repository = new PrismaFeedbackNoteRepository();
  const useCase = new GetFeedbackNotesUseCase(repository);

  return new GetFeedbackNotesController(useCase);
}
