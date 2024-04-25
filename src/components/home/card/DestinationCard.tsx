import React from "react";
import { Destination } from "../../../types";

type DestinationCardProps = {
  destination: Destination;
  onClick: () => void;
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
}) => {
  return (
    <div className="destination-card" onClick={onClick}>
      {destination.image_url && destination.image_url.length > 0 ? (
        <>
          <img
            alt={destination.name}
            src={destination.image_url[0]}
            className="destination-image"
          />
          <div className="destination-name">{destination.name}</div>
        </>
      ) : (
        <div className="destination-placeholder">{destination.name}</div>
      )}
    </div>
  );
};

export default DestinationCard;
