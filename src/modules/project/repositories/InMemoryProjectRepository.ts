import type { ICreateProjectRepositoryInput } from "./interfaces/ICreateProjectRepository";
import type { IProject } from "../interfaces/IProject";
import type { IProjectRepository } from "./interfaces/IProjectRepository";

export class InMemoryProjectRepository implements IProjectRepository {
  private projects: IProject[] = [];

  create(data: ICreateProjectRepositoryInput): Promise<IProject> {
    const project = {
      id: this.projects.length.toString(),
      name: data.name,
      description: data.description,
      slug: data.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      archivedAt: null,
      organizationId: data.organizationId,
    };

    this.projects.push(project);
    return Promise.resolve(project);
  }

  update(id: string, data: Partial<ICreateProjectRepositoryInput>): Promise<IProject | undefined> {
    this.projects.forEach((item) => {
      if (item.id === id) {
        item.name = data.name ?? item.name;
        item.description = data.description ?? item.description;
        item.slug = data.slug ?? item.slug;
        item.updatedAt = new Date();
        return Promise.resolve(item);
      }
    });

    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    this.projects = this.projects.filter((item) => item.id !== id);
    return Promise.resolve();
  }

  findById(id: string): Promise<IProject | null> {
    const project = this.projects.find((project) => project.id === id) || null;
    return Promise.resolve(project);
  }

  findProjectsByOrganizationId(organizationId: string): Promise<IProject[]> {
    const projects = this.projects.filter((project) => project.organizationId === organizationId);
    return Promise.resolve(projects);
  }
}
