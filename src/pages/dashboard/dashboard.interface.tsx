export interface currentOrgType extends getAllMyOrganizationsResponsePayload {
  // folder: Folder;
}

export interface Identifier {
  id: string;
  name: string;
}

export interface DashboardContextType {
  currentFolder: Identifier;
  setCurrentFolder: (folder: Identifier) => void;
  currentOrganisationDetails: Identifier;
  setCurrentOrganisationDetails: (currentOrg: Identifier) => void;
}

// user interface
export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  id: string;
  created_at: string;
  updated_at: string;
  is_email_verified: boolean;
  password: string;
}

// organization interface
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

// Folders interface

export interface Folder {
  is_default: boolean;
  updated_at: string;
  organization_id: string;
  name: string;
  id: string;
  created_at: string;
}

// Todo interface

export interface TodoResponsePayload {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  created_by: CreatedBy;
}
export interface CreatedBy {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  id: string;
}

export interface CreateTodoRequestPayload {
  title: string;
  description: string;
  due_date: string;
}
export interface UpdateTodoRequestPayload extends CreateTodoRequestPayload {
  completed: boolean;
}

// Note interface

export interface NoteResponsePayload {
  id: string;
  title: string;
  content: string;
  created_by: CreatedBy;
}
export interface CreateNoteRequestPayload {
  title: string;
  content: string;
}
export interface UpdateNoteRequestPayload extends CreateNoteRequestPayload {}

export interface ErrorType {
  data: {
    detail: string;
  };
}
export interface ErrorResponse {
  response: ErrorType;
}
