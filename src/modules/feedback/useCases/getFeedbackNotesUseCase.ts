import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IFeedbackNote } from "../interfaces/IFeedbackNote";
import type { IFeedbackNoteRepository } from "../repositories/interfaces/IFeedbackNoteRepository";

export interface IGetFeedbackNotes {
  organizationId: string;
  projectId: string;
  feedbackId: string;
  requesterUserId: string;
}

export class GetFeedbackNotesUseCase extends BaseUseCase<IGetFeedbackNotes, IFeedbackNote[]> {
  constructor(private readonly feedbackNoteRepository: IFeedbackNoteRepository) {
    super();
  }

  protected async executeInternal(data: IGetFeedbackNotes): Promise<IFeedbackNote[]> {
    return await this.feedbackNoteRepository.findMany(data);
  }
}
