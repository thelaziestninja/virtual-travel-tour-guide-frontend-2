import axios, { AxiosResponse } from "axios";
import { Destination, DestinationFormValues, Feedback } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCountries = (): Promise<AxiosResponse<string[]>> =>
  api.get<string[]>("/countries");

export const getDestinations = (): Promise<AxiosResponse<Destination[]>> =>
  api.get<Destination[]>("/destination");

export const getDestinationById = (
  id: string
): Promise<AxiosResponse<Destination>> =>
  api.get<Destination>(`/destination/${id}`);

export const createDestination = (
  destination: DestinationFormValues
): Promise<AxiosResponse<Destination>> =>
  api.post<Destination>("/destination", destination);

export const getFeedbacks = (
  destinationId: string
): Promise<AxiosResponse<Feedback[]>> =>
  api.get<Feedback[]>(`/feedback/${destinationId}`);

export const createFeedback = (
  destinationId: string,
  feedbackData: { feedback_text: string; left_by: string }
): Promise<AxiosResponse<Feedback>> => {
  return api.post<Feedback>(`/feedback/${destinationId}`, feedbackData);
};
