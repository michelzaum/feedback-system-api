import { FeedbackStatus } from "../../../../generate/prisma/enums";

export interface ICreateFeedback {
  title: string;
  description: string;
  projectId: string;
  organizationId: string;
  status?: FeedbackStatus | undefined;
}
