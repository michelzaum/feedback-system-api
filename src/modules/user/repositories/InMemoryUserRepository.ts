import type { ICreateUserRepositoryInput } from "./interfaces/ICreateUserRepository";
import type { IUser } from "../interfaces/IUser";
import type { IUserRepository } from "./interfaces/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private users: IUser[] = [];

  create(data: ICreateUserRepositoryInput): Promise<IUser> {
    const user: IUser = {
      id: this.users.length.toString(),
      name: data.name,
      email: data.email,
    };

    this.users.push(user);
    return Promise.resolve(user);
  }

  update(
    id: string,
    data: Partial<ICreateUserRepositoryInput>,
  ): Promise<IUser | undefined> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return Promise.resolve(undefined);
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    return Promise.resolve(user);
  }

  delete(id: string): Promise<void> {
    this.users = this.users.filter((item) => item.id !== id);
    return Promise.resolve();
  }

  findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.id === id) || null;
    return Promise.resolve(user);
  }
}
