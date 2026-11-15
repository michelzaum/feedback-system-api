import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface IUpdateFeedbackRepositoryInput {
  status: FeedbackStatus;
  assigneeId?: string | null;
}
