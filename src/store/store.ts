// import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
// import { Destination } from "../utils/types";
// import { getDestinations } from "../services/api/apiSlice";

// //Store
// interface DestinationState {
//   destinations: Destination[];
// }

// interface FeedbackState {
//   exist: boolean;
//   feedback: string;
// }

// //Actions
// export const fetchDestinations = createAsyncThunk(
//   "destinations/fetch",
//   async () => {
//     const response = await getDestinations();
//     return response.json();
//   }
// );

// //reducers

// export const store = configureStore({
//   reducer: {},
// });
