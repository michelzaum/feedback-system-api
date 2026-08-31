import type { FindOrganizationByIdUseCase } from "../useCases/findOrganizationByIdUseCase";

interface IFindOrganizationByIdRequest {
  params: {
    id: string;
  };
}

export class FindOrganizationByIdController {
  constructor(private readonly findOrganizationByIdUseCase: FindOrganizationByIdUseCase) { }

  async handle(request: IFindOrganizationByIdRequest, response: any) {
    const { id } = request.params;

    try {
      const organization = await this.findOrganizationByIdUseCase.execute({ id });

      if (!organization) {
        return response.status(404).json({ error: "Organization not found" });
      }

      return response.json(organization);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
