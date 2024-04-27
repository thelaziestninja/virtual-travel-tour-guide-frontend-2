import React from "react";
import AppHeader from "../components/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDestinationById } from "../hooks/useDestinations";
import { Layout, Space } from "antd";
import DestinationDetails from "../components/destination/DestinationDetails";
import { FeedbackSection } from "../components/destination/FeedbackSection";

const { Content } = Layout;

const DestinationPage: React.FC = () => {
  const { id = "default-id" } = useParams();

  const { data: destination, isLoading, error } = useDestinationById(id);

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
