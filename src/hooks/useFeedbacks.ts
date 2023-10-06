import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFeedbacks, createFeedback } from "../services/api";
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

export const useCreateFeedback = (destinationId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (feedbackData: { feedback_text: string; left_by: string }) =>
      createFeedback(destinationId, feedbackData),
    {
      // When the feedback creation is successful, invalidate the feedbacks for the current destination
      onSuccess: () => {
        queryClient.invalidateQueries(["feedbacks", destinationId]);
      },
    }
  );
};