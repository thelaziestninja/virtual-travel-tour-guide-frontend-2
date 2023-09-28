import { useQuery } from "react-query";
import { getDestinations } from "../services/api";
import { Destination } from "../utils/types";

export const useDestinations = () => {          // returns the data property fron tghe Axios response, rathr than the whole response.
  return useQuery<Destination[], Error>("destinations", async () => {
    const response = await getDestinations();
    return response.data;
  });
};

export const useDestinationById = () => {};
