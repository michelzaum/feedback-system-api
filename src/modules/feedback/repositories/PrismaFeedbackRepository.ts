import { prisma } from "../../../lib/prisma";
import type { IFeedback } from "../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    const { organizationId, ...rest } = data;
    return prisma.feedbacks.create({
      data: {
        ...rest,
      },
      include: { project: true, status: true },
    });
  }

  async update(
    id: string,
    data: IUpdateFeedbackRepositoryInput,
  ): Promise<IFeedback | undefined> {
    return await prisma.feedbacks.update({
      where: { id },
      data: {
        statusId: data.statusId,
      },
    });
  }

  async findById(id: string): Promise<IFeedback | null> {
    return await prisma.feedbacks.findUnique({
      where: { id },
      include: { project: true, status: true },
    });
  }

  async findFeedbacksByProjectId(projectId: string): Promise<IFeedback[]> {
    return await prisma.feedbacks.findMany({
      where: { projectId },
      include: { project: true, status: true },
    });
  }
}
