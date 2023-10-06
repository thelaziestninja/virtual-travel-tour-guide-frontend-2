import React from "react";
import { Destination } from "../utils/types";
import { useNavigate } from "react-router-dom";

type DestinationCardProps = {
  destination: Destination;
  onClick: () => void;
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  const navigate = useNavigate();
  
  const handleNameClick = () => {
    navigate(`/destination/${destination._id}`);
  };

  return (
    <div className="destination-card">
      {destination.image_url && destination.image_url.length > 0 ? (
        <>
          <img 
            alt={destination.name} 
            src={destination.image_url[0]} 
            className="destination-image" 
            onClick={onClick}
          />
          <div className="destination-name" onClick={handleNameClick}>
            {destination.name}
          </div>
        </>
      ) : (
        <div className="destination-placeholder">{destination.name}</div>
      )}
    </div>
  );
};
    
    export default DestinationCard;
