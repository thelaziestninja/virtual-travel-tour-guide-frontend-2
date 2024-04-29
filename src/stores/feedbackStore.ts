import { makeAutoObservable } from "mobx";
import { ApiError, Feedback } from "../types";
import { createFeedback, getFeedbacks } from "../services/api";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

class FeedbackStore {
  feedbacks?: Feedback[] = [];
  isLoading = true;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchFeedbacks = async (destinationId: string): Promise<void> => {
    this.isLoading = true;
    try {
      const response = await getFeedbacks(destinationId);
      this.feedbacks = response.data;
      this.error = null;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.error = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.error = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isLoading = false;
    }
  };

  addFeedback = async (
    destinationId: string,
    feedbackData: { feedback_text: string; left_by: string }
  ): Promise<void> => {
    this.isLoading = true;
    try {
      const response = await createFeedback(destinationId, feedbackData);
      this.feedbacks?.push(response.data);
      this.error = null;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.error = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.error = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isLoading = false;
    }
  };
}

export const feedbackStore = new FeedbackStore();
