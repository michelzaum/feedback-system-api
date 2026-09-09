import { prisma } from "../../../lib/prisma";
import { FeedbackStatus } from "../../../../generate/prisma/enums";
import type { IFeedback } from "../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    const { projectId, status = FeedbackStatus.PENDING } = data;

    return await prisma.feedbacks.create({
      data: {
        title: data.title,
        description: data.description,
        projectId,
        status,
      },
    });
  }

  async update(
    id: string,
    data: IUpdateFeedbackRepositoryInput,
  ): Promise<IFeedback | undefined> {
    return await prisma.feedbacks.update({
      where: { id: id },
      data: {
        status: data.status,
      },
    });
  }

  async findById(id: string): Promise<IFeedback | null> {
    return await prisma.feedbacks.findUnique({
      where: { id: id },
    });
  }

  async findManyByProjectId(projectId: string): Promise<IFeedback[]> {
    return await prisma.feedbacks.findMany({
      where: { projectId },
    });
  }
}
