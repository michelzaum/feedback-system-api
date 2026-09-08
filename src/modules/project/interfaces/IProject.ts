export interface IProject {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  organizationId: string;
}
