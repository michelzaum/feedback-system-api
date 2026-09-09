import { FeedbackStatus } from "../../../../generate/prisma/enums";
import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedback } from "../interfaces/IFeedback";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class InMemoryFeedbackRepository implements IFeedbackRepository {
  private feedbacks: IFeedback[] = [];

  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    const feedback: IFeedback = {
      feedbackId: this.feedbacks.length.toString(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: data.projectId,
      status: data.status ?? FeedbackStatus.PENDING,
    };

    this.feedbacks.push(feedback);
    return Promise.resolve(feedback);
  }

  async update(feedbackId: string, data: IUpdateFeedbackRepositoryInput): Promise<IFeedback | undefined> {
    this.feedbacks.forEach((item) => {
      if (item.feedbackId === feedbackId) {
        item.status = data.status;
        item.updatedAt = new Date();
        return Promise.resolve(item);
      }
    });

    return Promise.resolve(undefined);
  }

  async findById(feedbackId: string): Promise<IFeedback | null> {
    const feedback = this.feedbacks.find((f) => f.feedbackId === feedbackId) || null;
    return Promise.resolve(feedback);
  }

  async findManyByProjectId(projectId: string): Promise<IFeedback[]> {
    const feedbacks = this.feedbacks.filter((f) => f.projectId === projectId);
    return Promise.resolve(feedbacks);
  }
}
