export interface IOrganizationInfo {
  id: string;
  name: string;
}

export interface IMembersFromOrganization {
  id: string;
  name: string;
  email: string;
  organizations: IOrganizationInfo[];
}
