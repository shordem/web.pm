// import { Client } from "../services/api-client";
import { Client } from "../http-client";
import {
  AddMemberRequestPayload,
  CreateNewOrganizationRequestPayload,
  CreateNewOrganizationResponsePayload,
  OrganizationDetails,
  deleteOrganizationMemberType,
  getAllMyOrganizationsResponsePayload,
  getMembersPayload,
} from "./organization.interface";

export class OrganizationService {
  private apiClient = new Client();

  getAllMyOrganizations() {
    return this.apiClient.get<getAllMyOrganizationsResponsePayload[]>(
      "organizations"
    );
  }

  getOrganizationDetails(orgId: string) {
    return this.apiClient.get<OrganizationDetails>(`organizations/${orgId}`);
  }

  createOrganization(data: CreateNewOrganizationRequestPayload) {
    return this.apiClient.post<
      CreateNewOrganizationRequestPayload,
      CreateNewOrganizationResponsePayload
    >("organizations", data);
  }

  getOrganizationMembers(orgId: string) {
    return this.apiClient.get<getMembersPayload[]>(
      `organizations/${orgId}/members`
    );
  }
  deleteOrganizationMember(data: deleteOrganizationMemberType) {
    return this.apiClient.delete(
      `organizations/${data.orgId}/members/${data.memberId}`
    );
  }
  addMember(data: AddMemberRequestPayload) {
    return this.apiClient.post<{ email: string }>(
      `organizations/${data.orgId}/members`,
      {
        email: data.email,
      }
    );
  }
}
