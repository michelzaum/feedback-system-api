import { CreateOrganizationController } from "../controllers/createOrganizationController";
import { PrismaOrganizationRepository } from "../repositories/PrismaOrganizationRepository";
import { PrismaMembershipRepository } from "../../membership/repositories/PrismaMembershipRepository";
import { CreateOrganizationUseCase } from "../useCases/createOrganizationUseCase";

export function makeCreateOrganizationController() {
  const prismaOrganizationRepository = new PrismaOrganizationRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(prismaOrganizationRepository, prismaMembershipRepository);

  return new CreateOrganizationController(createOrganizationUseCase);
}
