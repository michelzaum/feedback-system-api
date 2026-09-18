import { FindMyOrganizationsController } from "../controllers/findMyOrganizationsController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { FindMyOrganizationsUseCase } from "../useCases/findMyOrganizationsUseCase";

export function makeFindMyOrganizationsController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findMyOrganizationsUseCase = new FindMyOrganizationsUseCase(prismaMembershipRepository);

  return new FindMyOrganizationsController(findMyOrganizationsUseCase);
}
