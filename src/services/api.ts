import axios, { AxiosResponse } from "axios";
import { Destination, Feedback } from "../utils/types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getDestinations = (): Promise<AxiosResponse<Destination[]>> =>
  api.get<Destination[]>("/destination");

// export const getDestinations = async (): Promise<Destination[]> => {
//   try {
//     const response = await api.get("/destination");
//     return response.data;
//   } catch (e) {
//     console.error("Error fetching destinations:", e);
//     throw e;
//   }
// };

export const getDestinationById = (
  id: string
): Promise<AxiosResponse<Destination>> =>
  api.get<Destination>(`/destination/${id}`);

// export const getDestinationById = async (: string): Promise<Destination> => {
//   try {
//     const response = await api.get(`/destination/${id}`);
//     return response.data;
//   } catch (e) {
//     console.error(`Error fetching destination with id ${id}:`, e);
//     throw e;
//   }
// };

export const createDestination = (
  destination: Destination
): Promise<AxiosResponse<Destination>> =>
  api.post<Destination>("/destination", destination);

// export const createDestination = async (destination: Destination) => {
//   try {
//     const response = await api.post('/destination', destination);
//     return response.data;
//   } catch (e) {
//     console.error('Error creating destination:', e);
//     throw e;
//   }
// };

export const getFeedbacks = (
  destinationId: string
): Promise<AxiosResponse<Feedback[]>> =>
  api.get<Feedback[]>(`/feedback/${destinationId}`);

// export const getFeedbacks = async (destinationId: string) => {
//   try {
//     const response = await api.get(
//       `/feedbacks?destination_id=${destinationId}`
//     );
//     return response.data;
//   } catch (e) {
//     console.error("Error fetching feedbacks:", e);
//     throw e;
//   }
// };
