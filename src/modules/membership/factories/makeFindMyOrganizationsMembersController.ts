import { FindMyOrganizationsMembersController } from "../controllers/findMyOrganizationsMembersController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { FindMyOrganizationsMembersUseCase } from "../useCases/findMyOrganizationsMembersUseCase";

export function makeFindMyOrganizationsMembersController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findMyOrganizationsMembersUseCase = new FindMyOrganizationsMembersUseCase(prismaMembershipRepository);

  return new FindMyOrganizationsMembersController(findMyOrganizationsMembersUseCase);
}
