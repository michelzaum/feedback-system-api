import { prisma } from "../../../lib/prisma";
import type { IFeedback } from "../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    const { projectId } = data;
    const statusId = await prisma.feedbackStatus.findFirst();

    const result = await prisma.feedbacks.create({
      data: {
        title: data.title,
        description: data.description,
        projectId,
        statusId: statusId?.id ?? '',
      },
    });
    return { ...result, feedbackId: result.id };
  }

  async update(
    feedbackId: string,
    data: IUpdateFeedbackRepositoryInput,
  ): Promise<IFeedback | undefined> {
    const result = await prisma.feedbacks.update({
      where: { id: feedbackId },
      data: {
        statusId: data.statusId,
      },
    });
    return result ? { ...result, feedbackId: result.id } : undefined;
  }

  async findById(feedbackId: string): Promise<IFeedback | null> {
    const result = await prisma.feedbacks.findUnique({
      where: { id: feedbackId },
    });
    return result ? { ...result, feedbackId: result.id } : null;
  }

  async findManyByProjectId(projectId: string): Promise<IFeedback[]> {
    const results = await prisma.feedbacks.findMany({
      where: { projectId },
    });
    return results.map((r) => ({ ...r, feedbackId: r.id }));
  }
}
