import React from "react";
import AppHeader from "../components/Header";
import { Layout, Row, Col, Space, Carousel } from "antd";
import { useFeedbacks } from "../hooks/useFeedbacks";
import { useNavigate, useParams } from "react-router-dom";
import { useDestinationById } from "../hooks/useDestinations";

const { Content } = Layout;

const DestinationPage: React.FC = () => {
  const { id = "default-id" } = useParams();
  const navigate = useNavigate();

  const {
    data: destination,
    isLoading: isLoadingDestination,
    error: destinationError,
  } = useDestinationById(id);
  const {
    data: feedbacks,
    isLoading: isLoadingFeedbacks,
    error: feedbacksError,
  } = useFeedbacks(id);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearch = (value: string) => {
    // Assuming there's a destination name to id mapping function
    // replace `getDestinationId` with your actual function to get the destination id by name
    const destinationId = getDestinationId(value);
    navigate(`/destination/${destinationId}`);
  };

  if (isLoadingDestination || isLoadingFeedbacks) {
    return <div>Loading...</div>;
  }

  if (destinationError || feedbacksError) {
    return (
      <div>Error: {destinationError?.message || feedbacksError?.message}</div>
    );
  }

  return (
    <Layout style={{ background: "none" }}>
        <AppHeader onHomeClick={handleHomeClick} onSearch={handleSearch} query="" />
        <Content style={{ padding: "0 150px" }}>  {/* Same padding as HomePage */}
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px 0",  // Add some padding at the top and bottom
                }}
            >
                {destination && (
                    <Row justify="center">
                        <Col>
                            {destination.image_url && destination.image_url[0] && (
                                <img 
                                    src={destination.image_url[0]} 
                                    alt={destination.name} 
                                    style={{  width: '100%', maxWidth: '100%', height: 'auto' }}  // Adjust width and height as needed
                                />
                            )}
                        </Col>
                    </Row>
                )}

                {/* ... rest of your code for displaying destination details and feedbacks */}
            </Space>
        </Content>
    </Layout>
);
};

export default DestinationPage;
