import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface ICreateFeedbackRepositoryInput {
  title: string;
  description: string;
  projectId: string;
  status?: FeedbackStatus | undefined;
}
