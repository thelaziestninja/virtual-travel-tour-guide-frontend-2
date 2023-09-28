import React, { useState } from "react";
import { Destination } from "../utils/types";
import { useDestinations } from "../hooks/useDestinations";
import DestinationModal from "../components/DestinationModal";

const HomePage: React.FC = () => {
  const { destinations, loading } = useDestinations();

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div>
      <h2>Destinations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {destinations.map((destination) => (
            <li
              key={destination._id}
              onClick={() => handleDestinationClick(destination)}
            >
              <h3>{destination.name}</h3>
              {/* Other destination details omitted for brevity */}
            </li>
          ))}
        </ul>
      )}
      <DestinationModal
        destination={selectedDestination}
        visible={!!selectedDestination}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HomePage;
