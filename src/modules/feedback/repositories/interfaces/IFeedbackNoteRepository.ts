import type { IFeedbackNote } from "../../interfaces/IFeedbackNote";

export interface IFeedbackNoteRepository {
  findMany(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    requesterUserId: string;
  }): Promise<IFeedbackNote[]>;
  create(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    authorId: string;
    content: string;
  }): Promise<IFeedbackNote>;
  delete(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    noteId: string;
    requesterUserId: string;
  }): Promise<void>;
}
