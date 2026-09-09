import { FeedbackStatus } from "../../../../generate/prisma/enums";

export interface IUpdateFeedback {
  feedbackId: string;
  status: FeedbackStatus;
}
