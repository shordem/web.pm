export interface getAllMyOrganizationsResponsePayload {
  id: string;
  name: string;
  image_url: null;
}

export interface OrganizationDetails {
  image_url: null;
  description: string;
  id: string;
  created_at: string;
  name: string;
  owner_id: string;
  updated_at: string;
}
export interface getMembersPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  id: string;
  role: string;
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
