// import { Client } from "../services/api-client";

// OrganizationService

import { Client } from "@/services/http-client";
import {
  getAllMyOrganizationsResponsePayload,
  OrganizationDetails,
  CreateNewOrganizationRequestPayload,
  CreateNewOrganizationResponsePayload,
  getMembersPayload,
  deleteOrganizationMemberType,
  AddMemberRequestPayload,
  Folder,
  TodoResponsePayload,
  CreateTodoRequestPayload,
  CreateNoteRequestPayload,
  UpdateTodoRequestPayload,
  NoteResponsePayload,
  User,
} from "./dashboard.interface";

export class DashboardService {
  private apiClient = new Client();

  // User Services
  getUserDetails() {
    return this.apiClient.get<User>("user");
  }

  // Organization services
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
  // Folder services
  getFolders(orgId: string) {
    return this.apiClient.get<Folder[]>(`folders/${orgId}`);
  }
  postFolder(orgId: string, data: { name: string }) {
    return this.apiClient.post(`folders/${orgId}`, data);
  }
  deleteFolder(orgId: string, folderId: string) {
    return this.apiClient.delete(`folders/${orgId}/${folderId}`);
  }
  updateFolder(orgId: string, folderId: string, data: { name: string }) {
    return this.apiClient.patch(`folders/${orgId}/${folderId}`, data);
  }
  // todo services
  getAllTodos(orgId: string, folderId: string) {
    return this.apiClient.get<TodoResponsePayload[]>(
      `todos/${orgId}/${folderId}`
    );
  }
  getTodoDetails(orgId: string, todoId: string) {
    return this.apiClient.get<TodoResponsePayload>(
      `todos/${orgId}/${todoId}/view`
    );
  }
  createTodo(orgId: string, folderId: string, data: CreateTodoRequestPayload) {
    return this.apiClient.post(`todos/${orgId}/${folderId}`, data);
  }
  deleteTodo(orgId: string, todoId: string) {
    return this.apiClient.delete(`todos/${orgId}/${todoId}`);
  }
  updateTodo(orgId: string, todoId: string, data: UpdateTodoRequestPayload) {
    return this.apiClient.patch(`todos/${orgId}/${todoId}`, data);
  }
  // note services
  getAllNotes(orgId: string, folderId: string) {
    return this.apiClient.get<NoteResponsePayload[]>(
      `notes/${orgId}/${folderId}`
    );
  }
  getNoteDetails(orgId: string, noteId: string) {
    return this.apiClient.get<NoteResponsePayload>(
      `notes/${orgId}/${noteId}/view`
    );
  }
  createNote(orgId: string, folderId: string, data: CreateNoteRequestPayload) {
    return this.apiClient.post(`notes/${orgId}/${folderId}`, data);
  }
  deleteNote(orgId: string, noteId: string) {
    return this.apiClient.delete(`notes/${orgId}/${noteId}`);
  }
  updateNote(orgId: string, noteId: string, data: CreateNoteRequestPayload) {
    return this.apiClient.patch(`notes/${orgId}/${noteId}`, data);
  }
}
