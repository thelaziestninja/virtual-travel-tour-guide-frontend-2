import React from "react";
import { Modal } from "antd";
import { Destination, Feedback } from "../../../types";
import { useFeedbacks } from "../../../hooks/useFeedbacks";

type DestinationModalProps = {
  destination: Destination | null;
  open: boolean;
  onClose: () => void;
  bodyStyle?: React.CSSProperties;
  onViewMoreClick: (destination: Destination) => void;
};

const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  open,
  onClose,
  bodyStyle,
  onViewMoreClick,
}) => {
  const { data: feedbacks, isLoading } = useFeedbacks(
    destination ? destination.id : undefined
  );

  const latestFeedbacks = feedbacks
    ?.sort(
      (a, b) =>
        new Date(b.feedback_date).getTime() -
        new Date(a.feedback_date).getTime()
    )
    .slice(0, 3);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={destination?.name || "Destination Details"}
      footer={null}
      bodyStyle={bodyStyle}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{destination?.description}</p>
          <p>Country: {destination?.country}</p>
          <p>Best time to visit: {destination?.best_time_to_visit}</p>
          <h3>Feedback:</h3>
          <ul>
            {latestFeedbacks && latestFeedbacks.length > 0 ? (
              latestFeedbacks.map((feedback: Feedback) => (
                <li key={feedback.id}>
                  {feedback.feedback_text} - {feedback.left_by} on{" "}
                  {new Date(feedback.feedback_date).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p>No feedback available for this destination.</p>
            )}
          </ul>
          {destination && (
            <a
              style={{ color: "blue", marginTop: "10px", display: "block" }}
              onClick={() => onViewMoreClick(destination)}
            >
              View More
            </a>
          )}
        </>
      )}
    </Modal>
  );
};

export default DestinationModal;
