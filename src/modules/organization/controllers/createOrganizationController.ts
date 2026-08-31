import type { Request, Response } from 'express';
import type { CreateOrganizationUseCase } from "../useCases/createOrganizationUseCase";

interface ICreateOrganizationRequest {
  name: string;
}

export class CreateOrganizationController {
  constructor(private readonly createOrganizationUseCase: CreateOrganizationUseCase) { }

  async handle(request: Request<any, any, ICreateOrganizationRequest>, response: Response) {
    const { name } = request.body;

    const organization = await this.createOrganizationUseCase.execute({ name });

    response.json(organization);
  }
}
