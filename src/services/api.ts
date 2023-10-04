import axios, { AxiosResponse } from "axios";
import { Destination, Feedback } from "../utils/types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getDestinations = (): Promise<AxiosResponse<Destination[]>> =>
  api.get<Destination[]>("/destination");

export const getDestinationById = (
  id: string
): Promise<AxiosResponse<Destination>> =>
  api.get<Destination>(`/destination/${id}`);

export const createDestination = (
  destination: Destination
): Promise<AxiosResponse<Destination>> =>
  api.post<Destination>("/destination", destination);

export const getFeedbacks = (
  destinationId: string
): Promise<AxiosResponse<Feedback[]>> =>
  api.get<Feedback[]>(`/feedback/${destinationId}`);
