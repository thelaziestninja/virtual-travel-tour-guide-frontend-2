import React from "react";
import { Layout, Space } from "antd";
import AppHeader from "../components/home/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDestinationById } from "../hooks/useDestinations";
import { FeedbackSection } from "../components/destination/FeedbackSection";
import DestinationDetails from "../components/destination/DestinationDetails";

const { Content } = Layout;

const DestinationPage: React.FC = () => {
  const { id = "default-id" } = useParams();
  const { data: destination, isLoading, error } = useDestinationById(id);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout style={{ background: "none" }}>
      <AppHeader
        onHomeClick={() => {
          navigate("/");
        }}
      />
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
