import { ApiError } from "../types";

export function isErrorWithMessage(error: unknown): error is ApiError {
  if (typeof error === "object" && error !== null) {
    const potentialError = error as Partial<ApiError>;
    return (
      typeof potentialError.message === "string" &&
      (potentialError.statusCode === undefined ||
        typeof potentialError.statusCode === "number")
    );
  }
  return false;
}
