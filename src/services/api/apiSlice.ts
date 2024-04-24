/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Destination,
  DestinationFormValues,
  Country,
  Feedback,
  FeedbackFormValues,
} from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Destination", "Feedback"],
  endpoints: (builder) => ({
    getCountries: builder.query<Country, void>({
      query: () => "/countries",
    }),
    getDestinations: builder.query<Destination[], void>({
      query: () => "/destination",
      transformResponse: (res: Destination[]) =>
        res.sort((a, b) => a.name.localeCompare(b.name)),
      providesTags: (result: Destination[]) =>
        result
          ? result.map(({ id }) => ({ type: "Destination", id }))
          : [{ type: "Destination", id: "LIST" }],
    }),
    getDestinationById: builder.query<Destination, string>({
      query: (id: string) => `/destination/${id}`,

      providesTags: (_result: any, _error: unknown, id: string) => [
        { type: "Destination", id },
      ],
    }),
    addDestination: builder.mutation<Destination, DestinationFormValues>({
      query: (destination: DestinationFormValues) => ({
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
      query: ({
        destinationId,
        feedbackData,
      }: {
        destinationId: string;
        feedbackData: FeedbackFormValues;
      }) => ({
        url: `/feedback/${destinationId}`,
        method: "POST",
        body: feedbackData,
      }),
      invalidatesTags: (
        _result: any,
        _error: unknown,
        { destinationId }: { destinationId: string }
      ) => [{ type: "Feedback", id: destinationId }],
    }),
    getFeedbacks: builder.query<Feedback[], string>({
      query: (destinationId: string) => `/feedback/${destinationId}`,
      providesTags: (_result: any, _error: unknown, destinationId: string) => [
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
