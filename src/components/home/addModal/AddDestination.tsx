import React from "react";
import FormField from "./FormField";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { Modal, Form, Button } from "antd";
import { Destination, DestinationFormValues } from "../../../types";
import { destinationStore } from "../../../stores/destinationStore";
import { AxiosError } from "axios";

type AddDestinationProps = {
  visible: boolean;
  onClose: () => void;
};

const AddDestination: React.FC<AddDestinationProps> = observer(
  ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values: DestinationFormValues) => {
      try {
        const destination: Destination = {
          id: uuidv4(),
          name: values.name,
          country: values.country,
          description: values.description,
          image_url: values.image_url,
          best_time_to_visit: values.best_time_to_visit,
        };
        await destinationStore.addDestination(destination);
        form.resetFields();
        onClose();
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          alert(axiosError.response.data);
        } else {
          // Handle non-Axios errors or other Axios response statuses
          console.error("An unexpected error occurred:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    };

    return (
      <Modal
        open={visible}
        title="Add Destination"
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <FormField
            name="name"
            label="Name"
            form={form}
            requiredMessage="Please input the destination name!"
          />
          <FormField
            name="country"
            label="Country"
            form={form}
            requiredMessage="Please input the country!"
          />
          <FormField
            name="description"
            label="Description"
            form={form}
            requiredMessage="Please input the description!"
            isTextArea
          />
          <FormField
            name="image_url"
            label="Image URL"
            form={form}
            requiredMessage="Please input the Image URL"
            isList
          />
          <FormField
            name="best_time_to_visit"
            label="Best Time to Visit"
            form={form}
            requiredMessage="Please input the best time to visit!"
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    );
  }
);

export default AddDestination;
