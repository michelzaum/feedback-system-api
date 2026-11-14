import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IFeedbackNote } from "../interfaces/IFeedbackNote";
import type { IFeedbackNoteRepository } from "../repositories/interfaces/IFeedbackNoteRepository";

export interface ICreateFeedbackNote {
  organizationId: string;
  projectId: string;
  feedbackId: string;
  authorId: string;
  content: string;
}

export class CreateFeedbackNoteUseCase extends BaseUseCase<ICreateFeedbackNote, IFeedbackNote> {
  constructor(private readonly feedbackNoteRepository: IFeedbackNoteRepository) {
    super();
  }

  protected async executeInternal(data: ICreateFeedbackNote): Promise<IFeedbackNote> {
    const content = data.content.trim();

    if (!content) {
      throw new Error("Note content is required");
    }

    return await this.feedbackNoteRepository.create({ ...data, content });
  }
}
