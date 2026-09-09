import { FeedbackStatus } from "../../../../generate/prisma/enums";

export interface IFeedback {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  status: FeedbackStatus;
}
