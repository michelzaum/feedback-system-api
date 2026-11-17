import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface IUpdateFeedbackRequestBody {
  status: FeedbackStatus;
  assigneeId?: string | null;
}
