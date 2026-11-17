import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IFeedbackNoteRepository } from "../repositories/interfaces/IFeedbackNoteRepository";

export interface IDeleteFeedbackNote {
  organizationId: string;
  projectId: string;
  feedbackId: string;
  noteId: string;
  requesterUserId: string;
}

export class DeleteFeedbackNoteUseCase extends BaseUseCase<IDeleteFeedbackNote, void> {
  constructor(private readonly feedbackNoteRepository: IFeedbackNoteRepository) {
    super();
  }

  protected async executeInternal(data: IDeleteFeedbackNote): Promise<void> {
    await this.feedbackNoteRepository.delete(data);
  }
}
