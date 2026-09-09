import { prisma } from "../../../lib/prisma";
import type { IUser } from "../interfaces/IUser";
import type { ICreateUserRepositoryInput } from "./interfaces/ICreateUserRepository";
import type { IUserRepository } from "./interfaces/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserRepositoryInput): Promise<IUser> {
    return prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<ICreateUserRepositoryInput>,
  ): Promise<IUser | undefined> {
    const updateData: {
      name?: string;
      email?: string;
      password_hash?: string;
    } = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    if (data.password_hash !== undefined) {
      updateData.password_hash = data.password_hash;
    }

    return await prisma.users.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
