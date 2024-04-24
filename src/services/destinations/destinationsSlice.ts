// import { sub } from "date-fns";
import { Destination, DestinationFormValues } from "../../types";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<string[], void>({
      query: () => "/countries",
    }),
    getDestinations: builder.query<Destination[], void>({
      query: () => "/destination",
      transformResponse: (res: Destination[]) =>
        res.sort((a, b) => a.name.localeCompare(b.name)),
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Destination", id }))
          : [{ type: "Destination", id: "LIST" }],
    }),
    getDestinationById: builder.query<Destination, string>({
      query: (id: string) => `/destination/${id}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }),
});

export const {
  useGetCountriesQuery,
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  useAddDestinationMutation,
} = extendedApiSlice;
