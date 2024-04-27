import React from "react";
import { Destination } from "../../../types";
import { useAtom } from "jotai";
import { selectedDestinationAtom } from "../../../state/homeAtoms";

type DestinationCardProps = {
  destination: Destination;
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [, setSelectedDestination] = useAtom(selectedDestinationAtom);
  return (
    <div
      className="destination-card"
      onClick={() => setSelectedDestination(destination)}
    >
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
