import React from "react";
import { useDestinations } from "../hooks/useDestinations";

const HomePage: React.FC = () => {
  const { destinations, loading } = useDestinations();

  return (
    <div>
      <h2>Destinations</h2>
      {loading ? (
        // Show a loading indicator while the destinations are being fetched
        <p>Loading...</p>
      ) : (
        // Map over each destination and render its details on the page
        <ul>
          {destinations.map((destination) => (
            <li key={destination._id}>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <p>Country: {destination.country}</p>
              <p>Best time to visit: {destination.best_time_to_visit}</p>
              {/* Optionally display the image if it exists */}
              {destination.image_url && (
                <img src={destination.image_url} alt={destination.name} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
