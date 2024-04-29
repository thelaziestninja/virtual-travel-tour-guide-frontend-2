type ObjectId = string;

export interface IDestinationStore {
  destinations: Destination[];
  isLoading: boolean;
  error: ApiError | null;
  fetchDestinations: () => Promise<void>;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image_url?: string[];
  country: string;
  best_time_to_visit: string;
}

export type DestinationFormValues = Omit<Destination, "id">;

export interface Feedback {
  id: ObjectId;
  destinationid: string;
  feedback_text: string;
  left_by: string;
  feedback_date: Date;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface AxiosError {
  response?: {
    status: number;
    data: string;
  };
}
