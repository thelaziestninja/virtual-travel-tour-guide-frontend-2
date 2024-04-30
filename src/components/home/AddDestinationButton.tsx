import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface AddDestinationButtonProps {
  onClick: () => void;
}

export const AddDestinationButton: React.FC<AddDestinationButtonProps> = ({
  onClick,
}) => (
  <Button
    type="primary"
    shape="circle"
    icon={<PlusOutlined />}
    size="large"
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    }}
  />
);
