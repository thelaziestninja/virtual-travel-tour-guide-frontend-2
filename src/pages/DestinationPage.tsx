import React from "react";
import AppHeader from "../components/home/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { destinationStore } from "../stores/destinationStore";

import { Layout, Space } from "antd";
import DestinationDetails from "../components/destination/DestinationDetails";
import { FeedbackSection } from "../components/destination/FeedbackSection";

const { Content } = Layout;

const DestinationPage: React.FC = () => {
  const { id = "default-id" } = useParams();

  const { destination, isLoading, error } = destinationStore!;

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout style={{ background: "none" }}>
      <AppHeader onHomeClick={handleHomeClick} />
      <Content style={{ padding: "0 650px" }}>
        <Space
          direction="horizontal"
          size="large"
          style={{
            width: "100%",
            display: "contents",
            flexDirection: "column",
            alignItems: "end",
            marginTop: "20px",
          }}
        >
          {destination && (
            <>
              <DestinationDetails destination={destination} />
              <FeedbackSection destinationId={id} />
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default DestinationPage;
