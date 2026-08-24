export interface IOrganization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  // Uncomment once these interfaces are created
  // memberships: Membership[];
  // projects: Project[];
}
