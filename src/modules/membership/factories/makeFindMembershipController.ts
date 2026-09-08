import { FindMembershipController } from "../controllers/findMembershipController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { FindMembershipUseCase } from "../useCases/findMembershipUseCase";

export function makeFindMembershipController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findMembershipUseCase = new FindMembershipUseCase(prismaMembershipRepository);

  return new FindMembershipController(findMembershipUseCase);
}
