import React from "react";
import { Modal } from "antd"; // Importing Modal from antd
import { Destination } from "../utils/types";
import { useFeedbacks } from "../hooks/useFeedbacks";

type DestinationModalProps = {
  destination: Destination | null;
  visible: boolean;
  onClose: () => void;
};

const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  visible,
  onClose,
}) => {
  const { feedbacks, loading } = useFeedbacks(
    destination ? destination._id : undefined
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={destination?.name || "Destination Details"}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{destination?.description}</p>
          <p>Country: {destination?.country}</p>
          <p>Best time to visit: {destination?.best_time_to_visit}</p>
          <h3>Feedbacks:</h3>
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id}>
                {feedback.feedback_text} - {feedback.left_by} on{" "}
                {new Date(feedback.feedback_date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </Modal>
  );
};

export default DestinationModal;
