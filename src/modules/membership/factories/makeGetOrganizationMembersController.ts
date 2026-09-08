import { GetOrganizationMembersController } from "../controllers/getOrganizationMembersController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { GetOrganizationMembersUseCase } from "../useCases/getOrganizationMembersUseCase";

export function makeGetOrganizationMembersController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const getOrganizationMembersUseCase = new GetOrganizationMembersUseCase(prismaMembershipRepository);

  return new GetOrganizationMembersController(getOrganizationMembersUseCase);
}