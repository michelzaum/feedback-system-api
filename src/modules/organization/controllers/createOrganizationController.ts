import type { CreateOrganizationUseCase } from "../useCases/createOrganizationUseCase";

interface ICreateOrganizationRequest {
  body: {
    name: string;
  }
}

export class CreateOrganizationController {
  constructor(private readonly createOrganizationUseCase: CreateOrganizationUseCase) { }

  async handle(request: ICreateOrganizationRequest, response: any) {
    const { name } = request.body;

    const organization = await this.createOrganizationUseCase.execute({ name });

    response.json(organization);
  }
}
