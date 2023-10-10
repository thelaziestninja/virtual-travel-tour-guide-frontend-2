import { useState, useEffect } from "react";
import { Destination } from "../utils/types";

export const useSearchFilter = (
  destinations: Destination[] | undefined,
  initialQuery: string,
  selectedCountry: string | null
) => {
  const [query, setQuery] = useState(initialQuery);
  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[] | null
  >(null);

  useEffect(() => {
    let newFilteredDestinations = destinations || [];

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      newFilteredDestinations = newFilteredDestinations.filter(
        (destination) =>
          destination.name.toLowerCase().startsWith(lowercasedQuery)
      );
    }

    if (selectedCountry) {
      newFilteredDestinations = newFilteredDestinations.filter(
        (destination) => destination.country === selectedCountry
      );
    }

    setFilteredDestinations(newFilteredDestinations);
  }, [destinations, query, selectedCountry]);

  return { query, setQuery, filteredDestinations };
};