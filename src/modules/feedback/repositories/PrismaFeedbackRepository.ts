import { prisma } from "../../../lib/prisma";
import { FeedbackStatus } from "../../../../generate/prisma/enums";
import type { IFeedback } from "../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./interfaces/ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./interfaces/IUpdateFeedbackRepository";
import type { IFeedbackRepository } from "./interfaces/IFeedbackRepository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback> {
    return await prisma.$transaction(
      async (tx) => {
        const { projectId, status = FeedbackStatus.NEW } = data;

        const project = await tx.projects.findFirst({
          where: { id: projectId },
          select: { id: true },
        });

        if (!project) {
          throw new Error("Project not found");
        }

        return await tx.feedbacks.create({
          data: {
            title: data.title,
            description: data.description,
            projectId,
            status,
          },
          include: { assignee: { select: { id: true, name: true } } },
        });
      },
    );
  }

  async update(
    id: string,
    data: IUpdateFeedbackRepositoryInput,
  ): Promise<IFeedback | undefined> {
    return await prisma.$transaction(async (tx) => {
      if (data.assigneeId) {
        const feedback = await tx.feedbacks.findUnique({
          where: { id },
          select: { project: { select: { organizationId: true } } },
        });
        if (!feedback) throw new Error("Feedback not found");

        const membership = await tx.memberships.findUnique({
          where: {
            organizationId_userId: {
              organizationId: feedback.project.organizationId,
              userId: data.assigneeId,
            },
          },
          select: { userId: true },
        });
        if (!membership) throw new Error("Assignee must be an organization member");
      }

      return await tx.feedbacks.update({
        where: { id },
        data: {
          status: data.status,
          ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId }),
        },
        include: { assignee: { select: { id: true, name: true } } },
      });
    });
  }

  async findById(id: string): Promise<IFeedback | null> {
    return await prisma.feedbacks.findUnique({
      where: { id: id },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async findManyByProjectId(projectId: string): Promise<IFeedback[]> {
    return await prisma.feedbacks.findMany({
      where: { projectId },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }

  async findManyByOrganizationId(organizationId: string): Promise<IFeedback[]> {
    return await prisma.feedbacks.findMany({
      where: {
        project: {
          organizationId,
        },
      },
      include: { assignee: { select: { id: true, name: true } } },
    });
  }
}
