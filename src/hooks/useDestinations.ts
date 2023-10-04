import { useQuery, useMutation } from "react-query";
import {
  createDestination,
  getDestinationById,
  getDestinations,
} from "../services/api";
import { Destination, DestinationFormValues } from "../utils/types";

export const useDestinations = () => {
  // returns the data property fron tghe Axios response, rather than the whole response.
  return useQuery<Destination[], Error>("destinations", async () => {
    const response = await getDestinations();
    return response.data;
  });
};

export const useDestinationById = (id: string) => {
  return useQuery<Destination, Error>(["destination", id], async () => {
    const response = await getDestinationById(id);
    return response.data;
  });
};

export const useCreateDestination = () => {
  return useMutation((newDestination: DestinationFormValues) =>
    createDestination(newDestination as unknown as Destination)
  );
};
