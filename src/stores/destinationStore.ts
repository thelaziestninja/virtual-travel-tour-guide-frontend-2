import { makeAutoObservable } from "mobx";
import { ApiError, Destination } from "../types";
import {
  createDestination,
  getCountries,
  getDestinationById,
  getDestinations,
} from "../services/api";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

class DestinationStore {
  destination?: Destination | null = null;
  destinations?: Destination[] = [];
  countries?: string[] = [];
  isLoading = true;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchDestinations = async (): Promise<void> => {
    this.isLoading = true;
    try {
      const response = await getDestinations();
      this.destinations = response.data;
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

  fetchCountries = async (): Promise<void> => {
    this.isLoading = true;
    try {
      const countries = await getCountries();
      this.countries = countries.data;
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

  fetchDestinationById = async (
    id: string
  ): Promise<Destination | undefined> => {
    this.isLoading = true;
    try {
      const response = await getDestinationById(id);

      return response.data;
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

  addDestination = async (destination: Destination): Promise<void> => {
    this.isLoading = true;
    try {
      const response = await createDestination(destination);
      this.destinations?.push(response.data);
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

export const destinationStore = new DestinationStore();
