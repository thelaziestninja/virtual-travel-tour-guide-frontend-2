import React, { useState } from "react";
import { Card, Input, Button, Checkbox, List, message } from "antd";
import { useCreateFeedback, useFeedbacks } from "../../hooks/useFeedbacks";

export const FeedbackSection: React.FC<{ destinationId: string }> = ({
  destinationId,
}) => {
  const [newFeedback, setNewFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [leftBy, setLeftBy] = useState("");

  const {
    data: feedbacks,
    isLoading,
    isError,
    error,
  } = useFeedbacks(destinationId);

  const createFeedbackMutation = useCreateFeedback(destinationId);

  const sortedFeedbacks = feedbacks
    ?.slice()
    .sort(
      (
        a: { feedback_date: string | number | Date },
        b: { feedback_date: string | number | Date }
      ) =>
        new Date(b.feedback_date).getTime() -
        new Date(a.feedback_date).getTime()
    );

  const handleSubmitFeedback = async () => {
    try {
      await createFeedbackMutation.mutateAsync({
        feedback_text: newFeedback,
        left_by: isAnonymous ? "Anonymous" : leftBy,
      });
      setNewFeedback("");
      setLeftBy("");
    } catch (error) {
      alert("Error submitting feedback");
      message.error("Error submitting feedback");
    }
  };

  if (isLoading) return <p>Loading feedback...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Card
      style={{ width: "200%", maxWidth: "600px", marginTop: "20px" }}
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
            marginRight: "20px",
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
            paddingLeft: "8px",
          }}
        />
        <Button
          type="primary"
          onClick={handleSubmitFeedback}
          style={{ marginLeft: "475px" }}
        >
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
              <div>{new Date(feedback.feedback_date).toLocaleDateString()}</div>
            </List.Item>
          )}
        />
      ) : (
        <p>No available feedback.</p>
      )}
    </Card>
  );
};
