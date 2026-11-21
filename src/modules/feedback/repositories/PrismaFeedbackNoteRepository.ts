import { prisma } from "../../../lib/prisma";
import type { IFeedbackNote } from "../interfaces/IFeedbackNote";
import type { IFeedbackNoteRepository } from "./interfaces/IFeedbackNoteRepository";

export class PrismaFeedbackNoteRepository implements IFeedbackNoteRepository {
  async findMany(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    requesterUserId: string;
  }): Promise<IFeedbackNote[]> {
    const membership = await prisma.memberships.findUnique({
      where: {
        organizationId_userId: {
          organizationId: input.organizationId,
          userId: input.requesterUserId,
        },
      },
    });

    if (!membership) {
      throw new Error("Only organization members can view feedback notes");
    }

    const feedback = await prisma.feedbacks.findFirst({
      where: {
        id: input.feedbackId,
        projectId: input.projectId,
        project: { organizationId: input.organizationId },
      },
      select: { id: true },
    });

    if (!feedback) {
      throw new Error("Feedback not found");
    }

    const notes = await prisma.feedbackNotes.findMany({
      where: { feedbackId: input.feedbackId },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: "asc" },
    });

    return notes;
  }

  async create(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    authorId: string;
    content: string;
  }): Promise<IFeedbackNote> {
    return await prisma.$transaction(async (tx) => {
      const membership = await tx.memberships.findUnique({
        where: {
          organizationId_userId: {
            organizationId: input.organizationId,
            userId: input.authorId,
          },
        },
      });

      if (!membership) {
        throw new Error("Only organization members can add feedback notes");
      }

      const feedback = await tx.feedbacks.findFirst({
        where: {
          id: input.feedbackId,
          projectId: input.projectId,
          project: { organizationId: input.organizationId },
        },
        select: { id: true },
      });

      if (!feedback) {
        throw new Error("Feedback not found");
      }

      return await tx.feedbackNotes.create({
        data: {
          content: input.content,
          feedbackId: input.feedbackId,
          authorId: input.authorId,
        },
        include: { author: { select: { id: true, name: true } } },
      });
    });
  }

  async delete(input: {
    organizationId: string;
    projectId: string;
    feedbackId: string;
    noteId: string;
    requesterUserId: string;
  }): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const membership = await tx.memberships.findUnique({
        where: {
          organizationId_userId: {
            organizationId: input.organizationId,
            userId: input.requesterUserId,
          },
        },
      });

      if (!membership) {
        throw new Error("Only organization members can delete feedback comments");
      }

      const feedback = await tx.feedbacks.findFirst({
        where: {
          id: input.feedbackId,
          projectId: input.projectId,
          project: { organizationId: input.organizationId },
        },
        select: { id: true },
      });

      if (!feedback) {
        throw new Error("Feedback not found");
      }

      const note = await tx.feedbackNotes.findFirst({
        where: {
          id: input.noteId,
          feedbackId: input.feedbackId,
        },
        select: { id: true, authorId: true },
      });

      if (!note) {
        throw new Error("Feedback comment not found");
      }

      if (note.authorId !== input.requesterUserId) {
        throw new Error("Only comment authors can delete their comments");
      }

      await tx.feedbackNotes.delete({ where: { id: note.id } });
    });
  }
}
