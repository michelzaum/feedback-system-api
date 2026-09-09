import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface IUpdateFeedbackRequestBody {
  status: FeedbackStatus;
}
