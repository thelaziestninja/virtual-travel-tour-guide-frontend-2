import { useQuery, useMutation, useQueryClient } from "react-query";
import { createDestination, getDestinationById } from "../services/api";
import { Destination, DestinationFormValues } from "../types";

export const useDestinationById = (id: string) => {
  return useQuery<Destination, Error>(["destination", id], async () => {
    const response = await getDestinationById(id);
    return response.data;
  });
};

export const useCreateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newDestination: DestinationFormValues) =>
      createDestination(newDestination),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("destinations");
      },
    }
  );
};
