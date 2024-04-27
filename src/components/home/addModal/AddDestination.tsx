import React from "react";
import FormField from "./FormField";
import { Modal, Form, Button } from "antd";
import { DestinationFormValues } from "../../../types";
import { useCreateDestination } from "../../../hooks/useDestinations";

type AddDestinationProps = {
  visible: boolean;
  onClose: () => void;
};
interface AxiosError extends Error {
  response: {
    status: number;
    data: string;
  };
}

const AddDestination: React.FC<AddDestinationProps> = ({
  visible,
  onClose,
}) => {
  const createDestinationMutation = useCreateDestination();

  const [form] = Form.useForm();

  const handleSubmit = (values: DestinationFormValues) => {
    try {
      createDestinationMutation.mutate(values, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      });
    } catch (error: unknown) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response.status === 400
      ) {
        alert((error as AxiosError).response.data);
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
};

export default AddDestination;
