export interface OrganizationDetails {
  image_url: null;
  description: string;
  id: string;
  created_at: string;
  name: string;
  owner_id: string;
  updated_at: string;
}
export interface CreateNewOrganizationRequestPayload {
  name: string;
}
export interface CreateNewOrganizationResponsePayload {
  detail: string;
}
export interface deleteOrganizationMemberType {
  orgId: string;
  memberId: string;
}
export interface AddMemberRequestPayload {
  orgId: string;
  email: string;
}
export interface AllUsersOrganizations {}
