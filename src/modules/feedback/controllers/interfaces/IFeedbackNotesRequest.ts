export interface IFeedbackNotesRequestParams {
  organizationId: string;
  projectId: string;
  feedbackId: string;
}

export interface ICreateFeedbackNoteRequestBody {
  content: string;
}
