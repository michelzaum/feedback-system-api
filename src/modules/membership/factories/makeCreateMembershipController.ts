import { CreateMembershipController } from "../controllers/createMembershipController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { CreateMembershipUseCase } from "../useCases/createMembershipUseCase";

export function makeCreateMembershipController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const createMembershipUseCase = new CreateMembershipUseCase(prismaMembershipRepository);

  return new CreateMembershipController(createMembershipUseCase);
}
