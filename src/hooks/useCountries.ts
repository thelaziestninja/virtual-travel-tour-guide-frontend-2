import { useQuery } from "react-query";
import { getCountries } from "../services/api";

export const useCountries = () => {
  return useQuery<string[], Error>("countries", async () => {
    const response = await getCountries();
    return response.data;
  });
};
