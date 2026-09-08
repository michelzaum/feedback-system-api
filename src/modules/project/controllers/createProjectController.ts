import type { Request, Response } from 'express';
import type { CreateProjectUseCase } from "../useCases/createProjectUseCase";
import type { ICreateProjectRequestParams, ICreateProjectRequestBody } from './interfaces/ICreateProjectRequest';

export class CreateProjectController {
  constructor(private readonly createProjectUseCase: CreateProjectUseCase) { }

  async handle(request: Request<ICreateProjectRequestParams, any, ICreateProjectRequestBody>, response: Response) {
    const { organizationId } = request.params;
    const { name, description } = request.body;

    try {
      const project = await this.createProjectUseCase.execute({ name, description, organizationId });
      return response.status(201).json(project);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
