import React from "react";
import { Typography, Card } from "antd";
import { Destination as DestinationType } from "../../types";

const { Title, Paragraph } = Typography;

type DestinationDetailsProps = {
  destination: DestinationType;
};

const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  destination,
}) => {
  return (
    <Card
      style={{ width: "200%", maxWidth: "600px" }}
      cover={
        destination.image_url &&
        destination.image_url[0] && (
          <img alt={destination.name} src={destination.image_url[0]} />
        )
      }
    >
      <Typography>
        <Title level={2}>{destination.name}</Title>
        <Paragraph>
          <strong>Country:</strong> {destination.country}
        </Paragraph>
        <Paragraph>
          <strong>Best Time to Visit:</strong> {destination.best_time_to_visit}
        </Paragraph>
        <Paragraph>
          <strong>Description:</strong> {destination.description}
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default DestinationDetails;
