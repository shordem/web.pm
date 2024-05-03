import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { OrganizationService } from "../services/organization";
import {
  AddMemberRequestPayload,
  CreateNewOrganizationRequestPayload,
  CreateNewOrganizationResponsePayload,
  deleteOrganizationMemberType,
} from "../services/organization/organization.interface";

const Organization = new OrganizationService();
export function useGetAllMyOrganizations() {
  const {
    isLoading: isGettingAllOrganizations,
    data: allOrganizations,
    error,
  } = useQuery({
    queryKey: ["allMyOrganizations"],
    queryFn: async () => await Organization.getAllMyOrganizations(),
  });

  return { isGettingAllOrganizations, allOrganizations, error };
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingOrganization, mutate: createOrganization } =
    useMutation({
      mutationFn: async (data: CreateNewOrganizationRequestPayload) =>
        await Organization.createOrganization(data),
      onSuccess: (
        data: AxiosResponse<CreateNewOrganizationResponsePayload>
      ) => {
        toast.success("Succesfully Created Organization");
        queryClient.invalidateQueries({ queryKey: ["allMyOrganizations"] });
      },
      onError: (err: AxiosError) => {
        const errorDetail =
          (err?.response?.data as any)?.detail || "An error occured";
        toast.error(errorDetail);
      },
    });
  return { isCreatingOrganization, createOrganization };
}
export function useGetOrganizationMembers(orgId: string) {
  const { isPending: isGettingMembers, data: members } = useQuery({
    queryKey: ["organizationMembers", orgId],
    queryFn: async () => await Organization.getOrganizationMembers(orgId),
  });
  return { isGettingMembers, members };
}
export function useAddMember() {
  const queryClient = useQueryClient();
  const { isPending: isAddingMember, mutate: addMember } = useMutation({
    mutationFn: async (data: AddMemberRequestPayload) =>
      await Organization.addMember(data),
    onSuccess: (data) => {
      toast.success("Succesfully added member");
      queryClient.invalidateQueries({ queryKey: ["organizationMembers"] });
    },
    onError: (err: AxiosError) =>
      toast.error(
        err.response?.data.detail || "An error occured, try again later"
      ),
  });
  return { isAddingMember, addMember };
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  const { isPending: isRemovingMember, mutate: removeMember } = useMutation({
    mutationFn: async (data: deleteOrganizationMemberType) =>
      await Organization.deleteOrganizationMember(data),
    onSuccess: (data) => {
      toast.success("Succesfully removed member");
      queryClient.invalidateQueries({ queryKey: ["organizationMembers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isRemovingMember, removeMember };
}
