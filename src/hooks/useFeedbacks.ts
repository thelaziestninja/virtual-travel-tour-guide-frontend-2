import { useQuery } from "react-query";
import { getFeedbacks } from "../services/api";
import { Feedback } from "../utils/types";

export const useFeedbacks = (destinationId: string | undefined) => {  // Make destinationId optional
  return useQuery<Feedback[], Error>(
    ["feedbacks", destinationId], 
    async () => {
      if (!destinationId) {
        // Return an empty array if destinationId is undefined
        return [];
      }
      const response = await getFeedbacks(destinationId);
      return response.data;
    },
    {
      enabled: !!destinationId,  // Only run the query if destinationId is defined
    }
  );
};

