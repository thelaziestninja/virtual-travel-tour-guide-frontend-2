import { useState, useEffect } from "react";
import { getFeedbacks } from "../services/api";
import { Feedback } from "../utils/types";

export const useFeedbacks = (destinationId?: string) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!destinationId) {
        // If destinationId is undefined, do nothing.
        setLoading(false);
        return;
      }

      try {
        const data = await getFeedbacks(destinationId);
        setFeedbacks(data);
      } catch (e) {
        console.error("Failed to fetch feedbacks:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [destinationId]);

  return { feedbacks, loading };
};

