import React, { useState } from "react";
import AppHeader from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDestinationById } from "../hooks/useDestinations";
import { useCreateFeedback, useFeedbacks } from "../hooks/useFeedbacks";
import {
  Layout,
  Space,
  Typography,
  Card,
  List,
  Input,
  Button,
  Checkbox,
} from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DestinationPage: React.FC = () => {
  const { id = "default-id" } = useParams();
  const [newFeedback, setNewFeedback] = useState("");
  const [leftBy, setLeftBy] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

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

  const navigate = useNavigate();
  const mutation = useCreateFeedback(id);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSubmitFeedback = async () => {
    if (newFeedback.trim() !== "") {
      try {
        await mutation.mutateAsync({
          feedback_text: newFeedback,
          left_by: isAnonymous ? "Anonymous" : leftBy,
        });
        setNewFeedback("");
        setLeftBy("");
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  const sortedFeedbacks = feedbacks
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.feedback_date).getTime() -
        new Date(a.feedback_date).getTime()
    );

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
      <AppHeader onHomeClick={handleHomeClick} onSearch={() => {}} query="" />
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
              <Card
                style={{ width: "100%", maxWidth: "600px" }}
                cover={
                  destination.image_url &&
                  destination.image_url[0] && (
                    <img
                      alt={destination.name}
                      src={destination.image_url[0]}
                    />
                  )
                }
              >
                <Typography>
                  <Title level={2}>{destination.name}</Title>
                  <Paragraph>
                    <strong>Country:</strong> {destination.country}
                  </Paragraph>
                  <Paragraph>
                    <strong>Best Time to Visit:</strong>{" "}
                    {destination.best_time_to_visit}
                  </Paragraph>
                  <Paragraph>
                    <strong>Description:</strong> {destination.description}
                  </Paragraph>
                </Typography>
              </Card>

              <Card
                style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}
                title="Feedback"
              >
                {/* Feedback input box */}
                <div style={{ marginBottom: "10px" }}>
                  <Checkbox
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  >
                    Anonymous
                  </Checkbox>
                  {!isAnonymous && (
                    <Input
                      value={leftBy}
                      onChange={(e) => setLeftBy(e.target.value)}
                      placeholder="Your name/nickname"
                      style={{ marginRight: "10px", marginTop: "10px" }}
                    />
                  )}
                  <Input
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Share your feedback..."
                    style={{
                      marginRight: "10px",
                      marginTop: "10px",
                      width: "83%",
                    }}
                  />
                  <Button type="primary" onClick={handleSubmitFeedback}>
                    Submit
                  </Button>
                </div>
                {sortedFeedbacks && sortedFeedbacks.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={sortedFeedbacks}
                    renderItem={(feedback) => (
                      <List.Item>
                        <List.Item.Meta
                          title={feedback.left_by}
                          description={feedback.feedback_text}
                        />
                        <div>
                          {new Date(
                            feedback.feedback_date
                          ).toLocaleDateString()}
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <p>No available feedback.</p>
                )}
              </Card>
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default DestinationPage;
