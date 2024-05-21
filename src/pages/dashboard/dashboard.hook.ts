import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import {
  CreateNewOrganizationRequestPayload,
  CreateNewOrganizationResponsePayload,
  CreateNoteRequestPayload,
  CreateTodoRequestPayload,
  ErrorResponse,
  ErrorType,
  UpdateTodoRequestPayload,
  deleteOrganizationMemberType,
} from "./dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { Storage } from "@/utilities/storage";

const Dashboard = new DashboardService();
const storage = new Storage();

// User hooks
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await Dashboard.getUserDetails(),
  });
}

// Organization hooks
export function useGetAllMyOrganizations() {
  const allOrganizations = useQuery({
    queryKey: ["allMyOrganizations"],
    queryFn: async () => await Dashboard.getAllMyOrganizations(),
  });
  if (allOrganizations.error) {
    if (
      (allOrganizations.error as unknown as ErrorResponse).response?.data
        ?.detail === "Invalid token"
    ) {
      storage.clear();
    }
  }
  return allOrganizations;
}

export function useGetOrganizationDetails(orgId: string) {
  const { isLoading: isGettingOrganization, data } = useQuery({
    queryKey: ["organizationDetails", orgId],
    queryFn: async () => await Dashboard.getOrganizationDetails(orgId),
  });
  return { isGettingOrganization, organization: data?.data };
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  const createOrganization = useMutation({
    mutationFn: async (data: CreateNewOrganizationRequestPayload) =>
      await Dashboard.createOrganization(data),
    onSuccess: (data: AxiosResponse<CreateNewOrganizationResponsePayload>) => {
      toast.success("Succesfully Created Organization");
      queryClient.invalidateQueries({ queryKey: ["allMyOrganizations"] });
    },
    onError: (err: AxiosError) => {
      const errorDetail =
        (err?.response?.data as any)?.detail || "An error occured";
      toast.error(errorDetail);
    },
  });
  return createOrganization;
}
export function useGetOrganizationMembers(orgId: string) {
  const members = useQuery({
    queryKey: ["organizationMembers", orgId],
    queryFn: async () => await Dashboard.getOrganizationMembers(orgId),
  });
  return members;
}
export function useAddMember(orgId: string) {
  const queryClient = useQueryClient();
  const addMember = useMutation({
    mutationFn: async (data: { email: string }) =>
      await Dashboard.addMember({ email: data.email, orgId }),
    onSuccess: (data) => {
      toast.success("Succesfully added member");
      queryClient.invalidateQueries({ queryKey: ["organizationMembers"] });
    },
    onError: (err: AxiosError) =>
      toast.error(
        (err.response as ErrorType)?.data.detail ||
          "An error occured, try again later"
      ),
  });
  return addMember;
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  const removeMember = useMutation({
    mutationFn: async (data: deleteOrganizationMemberType) =>
      await Dashboard.deleteOrganizationMember(data),
    onSuccess: (data) => {
      toast.success("Succesfully removed member");
      queryClient.invalidateQueries({ queryKey: ["organizationMembers"] });
    },
    onError: (err: AxiosError) => {
      if (
        (err.response as ErrorType)?.data.detail ===
        "403: User does not have the required permission"
      ) {
        return toast.error(
          "You do not have the required permission to remove this member"
        );
      }
      return toast.error((err.response as ErrorType)?.data.detail);
    },
  });
  return removeMember;
}

// Folder hooks
export function useGetFolders(orgId: string) {
  const folders = useQuery({
    queryKey: ["folders", orgId],
    queryFn: async () => await Dashboard.getFolders(orgId),
  });
  return folders;
}

export function useCreateFolder(orgId: string) {
  const queryClient = useQueryClient();
  const createFolder = useMutation({
    mutationFn: async (data: { name: string }) =>
      await Dashboard.postFolder(orgId, data),
    onSuccess: () => {
      toast.success("Succesfully created folder");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return createFolder;
}

export function useDeleteFolder(orgId: string) {
  const queryClient = useQueryClient();
  const deleteFolder = useMutation({
    mutationFn: async (folderId: string) =>
      await Dashboard.deleteFolder(orgId, folderId),
    onSuccess: () => {
      toast.success("Succesfully deleted folder");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return deleteFolder;
}

export function useUpdateFolder(orgId: string) {
  const queryClient = useQueryClient();
  const updateFolder = useMutation({
    mutationFn: async (data: { name: string; folderId: string }) =>
      await Dashboard.updateFolder(orgId, data.folderId, { name: data.name }),
    onSuccess: () => {
      toast.success("Succesfully updated folder");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return updateFolder;
}

// Todo hooks
export function useGetTodos(orgId: string, folderId: string) {
  const todos = useQuery({
    queryKey: ["todos", orgId, folderId],
    queryFn: async () => await Dashboard.getAllTodos(orgId, folderId),
  });
  return todos;
}
export function useGetTodoDetails(orgId: string, todoId: string) {
  const todoDetails = useQuery({
    queryKey: ["todoDetails", orgId, todoId],
    queryFn: async () => await Dashboard.getTodoDetails(orgId, todoId),
  });
  return todoDetails;
}

export function useCreateTodo(orgId: string, folderId: string) {
  const queryClient = useQueryClient();
  const createTodo = useMutation({
    mutationFn: async (data: CreateTodoRequestPayload) =>
      await Dashboard.createTodo(orgId, folderId, data),
    onSuccess: () => {
      toast.success("Succesfully created todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return createTodo;
}

export function useDeleteTodo(orgId: string) {
  const queryClient = useQueryClient();
  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) =>
      await Dashboard.deleteTodo(orgId, todoId),
    onSuccess: () => {
      toast.success("Succesfully deleted todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return deleteTodo;
}

export function useUpdateTodo(orgId: string, todoId: string) {
  const queryClient = useQueryClient();
  const updateTodo = useMutation({
    mutationFn: async (data: UpdateTodoRequestPayload) =>
      await Dashboard.updateTodo(orgId, todoId, data),
    onSuccess: () => {
      toast.success("Succesfully updated todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return updateTodo;
}

// Note hooks

export function useGetNotes(orgId: string, folderId: string) {
  const notes = useQuery({
    queryKey: ["notes", orgId, folderId],
    queryFn: async () => await Dashboard.getAllNotes(orgId, folderId),
  });
  return notes;
}

export function useGetNoteDetails(orgId: string, noteId: string) {
  const noteDetails = useQuery({
    queryKey: ["noteDetails", orgId, noteId],
    queryFn: async () => await Dashboard.getNoteDetails(orgId, noteId),
  });
  return noteDetails;
}

export function useCreateNote(orgId: string, folderId: string) {
  const queryClient = useQueryClient();
  const createNote = useMutation({
    mutationFn: async (data: CreateNoteRequestPayload) =>
      await Dashboard.createNote(orgId, folderId, data),
    onSuccess: () => {
      toast.success("Succesfully created note");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return createNote;
}

export function useDeleteNote(orgId: string) {
  const queryClient = useQueryClient();
  const deleteNote = useMutation({
    mutationFn: async (noteId: string) =>
      await Dashboard.deleteNote(orgId, noteId),
    onSuccess: () => {
      toast.success("Succesfully deleted note");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return deleteNote;
}

export function useUpdateNote(orgId: string, noteId: string) {
  const queryClient = useQueryClient();
  const updateNote = useMutation({
    mutationFn: async (data: CreateNoteRequestPayload) =>
      await Dashboard.updateNote(orgId, noteId, data),
    onSuccess: () => {
      toast.success("Succesfully updated note");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return updateNote;
}
