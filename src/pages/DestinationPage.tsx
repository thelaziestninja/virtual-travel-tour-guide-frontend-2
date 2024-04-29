import React from "react";
import { Layout, Space } from "antd";
import { observer } from "mobx-react-lite";
import AppHeader from "../components/home/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { destinationStore } from "../stores/destinationStore";
import { LoadingSpinner } from "../components/home/LoadingSpinner";
import { FeedbackSection } from "../components/destination/FeedbackSection";
import DestinationDetails from "../components/destination/DestinationDetails";

const { Content } = Layout;

const DestinationPage: React.FC = observer(() => {
  const { id = "default-id" } = useParams();

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  if (destinationStore.isLoading) return <LoadingSpinner />;
  if (destinationStore.error)
    return <div>Error: {destinationStore.error.message}</div>;

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
          {destinationStore.destination && (
            <>
              <DestinationDetails destination={destinationStore.destination} />
              <FeedbackSection destinationId={id} />
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
});

export default DestinationPage;
