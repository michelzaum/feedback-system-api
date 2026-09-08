import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedback } from "../interfaces/IFeedback";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class InMemoryFeedbackRepository implements IFeedbackRepository {
  private feedbacks: IFeedback[] = [];

  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    const feedback: IFeedback = {
      id: this.feedbacks.length.toString(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: data.projectId,
      statusId: data.statusId,
    };

    this.feedbacks.push(feedback);
    return Promise.resolve(feedback);
  }

  async update(id: string, data: IUpdateFeedbackRepositoryInput): Promise<IFeedback | undefined> {
    this.feedbacks.forEach((item) => {
      if (item.id === id) {
        item.statusId = data.statusId;
        item.updatedAt = new Date();
        return Promise.resolve(item);
      }
    });

    return Promise.resolve(undefined);
  }

  async findById(id: string): Promise<IFeedback | null> {
    const feedback = this.feedbacks.find((f) => f.id === id) || null;
    return Promise.resolve(feedback);
  }

  async findFeedbacksByProjectId(projectId: string): Promise<IFeedback[]> {
    const feedbacks = this.feedbacks.filter((f) => f.projectId === projectId);
    return Promise.resolve(feedbacks);
  }
}
