import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorMessageProps {
  error: FetchBaseQueryError | undefined;
}

const getErrorMessage = (error: FetchBaseQueryError | undefined): string => {
  if (!error) {
    return "An unknown error occurred";
  }

  if ("status" in error) {
    return `Error ${error.status}: ${
      error.data && typeof error.data === "object" && "message" in error.data
        ? error.data.message
        : "An error occurred"
    }`;
  }

  return "An error occurred";
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div>{getErrorMessage(error)}</div>
);
