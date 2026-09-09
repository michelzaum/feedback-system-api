import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface ICreateFeedbackRequestBody {
  title: string;
  description: string;
  status?: FeedbackStatus;
}
