/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feedback, CreateFeedbackParams } from "../../types";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation<Feedback, CreateFeedbackParams>({
      query: ({ destinationId, feedbackData }) => ({
        url: `/feedback/${destinationId}`,
        method: "POST",
        body: feedbackData,
      }),
      invalidatesTags: (_result: any, _error: unknown, { destinationId }) => [
        { type: "Feedback", id: destinationId },
      ],
    }),
    getFeedbacks: builder.query<Feedback[], string>({
      query: (destinationId: string) => `/feedback/${destinationId}`,
      providesTags: (_result: any, _error: unknown, destinationId: string) => [
        { type: "Feedback", id: destinationId },
      ],
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetFeedbacksQuery } =
  extendedApiSlice;
