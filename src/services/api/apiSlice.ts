import {
  Destination,
  DestinationFormValues,
  Feedback,
} from "../../utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Destination", "Feedback"],
  endpoints: (builder) => ({
    getCountries: builder.query<string[], void>({
      query: () => "/countries",
    }),
    getDestinations: builder.query<Destination[], void>({
      query: () => "/destination",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Destination", id }))
          : [{ type: "Destination", id: "LIST" }],
    }),
    getDestinationById: builder.query<Destination, string>({
      query: (id) => `/destination/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Destination", id: id }],
    }),
    addDestination: builder.mutation<Destination, DestinationFormValues>({
      query: (destination) => ({
        url: "/destination",
        method: "POST",
        body: destination,
      }),
      invalidatesTags: [{ type: "Destination", id: "LIST" }],
    }),
    createFeedback: builder.mutation<
      Feedback,
      {
        destinationId: string;
        feedbackData: { feedback_text: string; left_by: string };
      }
    >({
      query: ({ destinationId, feedbackData }) => ({
        url: `/feedback/${destinationId}`,
        method: "POST",
        body: feedbackData,
      }),
      invalidatesTags: (_result, _error, { destinationId }) => [
        { type: "Feedback", id: destinationId },
      ],
    }),
    getFeedbacks: builder.query<Feedback[], string>({
      query: (destinationId) => `/feedback/${destinationId}`,
      providesTags: (_result, _error, destinationId) => [
        { type: "Feedback", id: destinationId },
      ],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  useAddDestinationMutation,
  useCreateFeedbackMutation,
  useGetFeedbacksQuery,
} = apiSlice;
