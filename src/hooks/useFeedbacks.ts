import { useQuery } from "react-query";
import { getFeedbacks } from "../services/api";
import { Feedback } from "../utils/types";

export const useFeedbacks = (destinationId: string | undefined) => {
  return useQuery<Feedback[], Error>(
    ["feedbacks", destinationId],
    async () => {
      if (!destinationId) {
        return [];
      }
      const response = await getFeedbacks(destinationId);
      return response.data;
    },
    {
      enabled: !!destinationId,
    }
  );
};
