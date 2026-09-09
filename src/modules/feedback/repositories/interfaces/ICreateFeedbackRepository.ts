import { FeedbackStatus } from "../../../../../generate/prisma/enums";

export interface ICreateFeedbackRepositoryInput {
  title: string;
  description: string;
  projectId: string;
  organizationId: string;
  status?: FeedbackStatus | undefined;
}
