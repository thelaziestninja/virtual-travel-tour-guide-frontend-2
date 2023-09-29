import React, { useState } from "react";
import { Destination } from "../utils/types";
import { useDestinations } from "../hooks/useDestinations";
import DestinationModal from "../components/DestinationDetailsModal";

const HomePage: React.FC = () => {
  const { data: destinations, error, isLoading } = useDestinations();

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <h2>Destinations</h2>
      <ul>
        {destinations &&
          destinations.map((destination) => (
            <li
              key={destination._id}
              onClick={() => handleDestinationClick(destination)}
            >
              <h3>{destination.name}</h3>
              
            </li>
          ))}
      </ul>
      <DestinationModal
        destination={selectedDestination}
        open={!!selectedDestination}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HomePage;
