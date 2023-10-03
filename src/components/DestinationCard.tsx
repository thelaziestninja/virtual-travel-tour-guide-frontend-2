import React from "react";
import { Destination } from "../utils/types";

type DestinationCardProps = {
  destination: Destination;
  onClick: () => void;
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
}) => {
    return (
        <div 
          style={{
            width: 340,
            border: '1px solid #f0f0f0',   // Giving a subtle border
            cursor: 'pointer',             // Making it clear it's clickable
            transition: 'transform 0.2s', // Smooth transform on hover for a subtle effect
            overflow: 'hidden',            // To ensure everything stays contained
            marginBottom: '20px'           // Spacing between cards, optional based on your layout
          }} 
          onClick={onClick}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} // Optional: Scale up slightly on hover
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}   // Optional: Reset scale on mouse leave
        >
          {destination.image_url && destination.image_url.length > 0 ? (
            <img alt={destination.name} src={destination.image_url[0]} style={{ width: '100%', display: 'block' }} />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>{destination.name}</div>
          )}
        </div>
      );
    };
    
    export default DestinationCard;
