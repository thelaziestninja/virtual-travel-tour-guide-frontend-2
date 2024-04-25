import { Col, Row } from "antd";
import React from "react";
import DestinationCard from "./card/DestinationCard";
import { Destination } from "../../types";

interface DestinationsListProps {
  destinations: Destination[];
  onDestinationClick: (destination: Destination) => void;
}

export const DestinationsList: React.FC<DestinationsListProps> = ({
  destinations,
  onDestinationClick,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {destinations.map((destination, index) => (
        <Col key={destination.id || index} xs={24} sm={12} md={8} lg={6}>
          <DestinationCard
            destination={destination}
            onClick={() => onDestinationClick(destination)}
          />
        </Col>
      ))}
    </Row>
  );
};
