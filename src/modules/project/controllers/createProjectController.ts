import type { Request, Response } from 'express';
import type { CreateProjectUseCase } from "../useCases/createProjectUseCase";
import type { ICreateProjectRequestParams, ICreateProjectRequestBody } from './interfaces/ICreateProjectRequest';

export class CreateProjectController {
  constructor(private readonly createProjectUseCase: CreateProjectUseCase) { }

  async handle(request: Request<ICreateProjectRequestParams, any, ICreateProjectRequestBody>, response: Response) {
    const { organizationId } = request.params;
    const { name, description } = request.body;
    const requesterUserId = request.userId!;

    try {
      const project = await this.createProjectUseCase.execute({ name, description, organizationId, requesterUserId });
      return response.status(201).json(project);
    } catch (error: any) {
      if (error.message === "Only admins from this organization can create projects") {
        return response.status(403).json({ error: error.message });
      }
      if (error.message === "Project slug already exists") {
        return response.status(409).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
