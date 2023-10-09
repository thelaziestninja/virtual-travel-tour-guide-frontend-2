import { useState, useEffect } from "react";
import { Destination } from "../utils/types";

export const useSearchFilter = (
  destinations: Destination[] | undefined,
  initialQuery: string
) => {
  const [query, setQuery] = useState(initialQuery);
  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[] | null
  >(null);

  useEffect(() => {
    if (query) {
      console.log('query:', query);
      const lowercasedQuery = query.toLowerCase();
      console.log('lowercasedQuery:', lowercasedQuery);
      const newFilteredDestinations = destinations?.filter(
        (destination) =>
          destination.name.toLowerCase().startsWith(lowercasedQuery) ||
          destination.country.toLowerCase().startsWith(lowercasedQuery)
      );
      console.log('newFilteredDestinations:', newFilteredDestinations);
      setFilteredDestinations(newFilteredDestinations || []);
    } else {
      setFilteredDestinations(destinations || []);
    }
  }, [destinations, query]);

  return { query, setQuery, filteredDestinations };
};
