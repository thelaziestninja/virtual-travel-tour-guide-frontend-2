import { useState, useEffect } from "react";
import { getDestinations } from "../services/api";
import { Destination } from "../utils/types";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (e) {
        console.error("Failed to fetch destinations:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading };
};
