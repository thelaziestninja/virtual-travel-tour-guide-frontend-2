import React from "react";
import AppHeader from "../components/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";
import { useGetDestinationByIdQuery } from "../services/destinations/destinationsSlice";

import DestinationDetails from "../components/destination/DestinationDetails";
import { FeedbackSection } from "../components/destination/FeedbackSection";

const { Content } = Layout;

const DestinationPage: React.FC = () => {
  const navigate = useNavigate();
  const { id = "default-id" } = useParams();

  const {
    data: destination,
    isLoading: isLoadingDestination,
    error: destinationError,
  } = useGetDestinationByIdQuery(id);

  const handleHomeClick = () => {
    navigate("/");
  };

  if (isLoadingDestination) return <div>Loading...</div>;

  if (destinationError) return <div>Error: </div>;

  return (
    <Layout style={{ background: "none" }}>
      <AppHeader onHomeClick={handleHomeClick} />
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          paddingTop: "20px",
        }}
      >
        {destination && (
          <>
            <DestinationDetails destination={destination} />
            <FeedbackSection destinationId={destination.id} />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default DestinationPage;
