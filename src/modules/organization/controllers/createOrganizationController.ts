import type { Request, Response } from 'express';
import type { CreateOrganizationUseCase } from "../useCases/createOrganizationUseCase";
import type { ICreateOrganizationRequest } from './interfaces/ICreateOrganizationRequest';

export class CreateOrganizationController {
  constructor(private readonly createOrganizationUseCase: CreateOrganizationUseCase) { }

  async handle(request: Request<any, any, ICreateOrganizationRequest>, response: Response) {
    const { name } = request.body;
    const userId = request.userId

    if (!userId) {
      return response.status(401).json({ message: 'Not authenticated' });
    }

    const organization = await this.createOrganizationUseCase.execute({ name, userId });

    response.json(organization);
  }
}
