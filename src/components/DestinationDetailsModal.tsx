import React from "react";
import { Modal } from "antd"; // Importing Modal from antd
import { Destination, Feedback } from "../utils/types";
import { useFeedbacks } from "../hooks/useFeedbacks";

type DestinationModalProps = {
  destination: Destination | null;
  open: boolean;
  onClose: () => void;
};

const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  open,
  onClose,
}) => {
  const { data: feedbacks, isLoading } = useFeedbacks(
    destination ? destination._id : undefined
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={destination?.name || "Destination Details"}
      footer={null}
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
            {feedbacks && feedbacks.length > 0 ?(
              feedbacks.map((feedback: Feedback) => (
                <li key={feedback._id}>
                  {feedback.feedback_text} - {feedback.left_by} on{" "}
                  {new Date(feedback.feedback_date).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p>No feedback available for this destination.</p>
            )}
          </ul>
        </>
      )}
    </Modal>
  );
};

export default DestinationModal;
