import { FeedbackStatus } from "../../../../generate/prisma/enums";

export interface IUpdateFeedback {
  id: string;
  status: FeedbackStatus;
}
