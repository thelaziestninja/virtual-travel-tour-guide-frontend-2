import React from "react";
import { Modal, Form, Button, message } from "antd";
import { DestinationFormValues } from "../../utils/types";
import { useAddDestinationMutation } from "../../services/api/apiSlice";
import FormField from "./FormField";

type AddDestinationProps = {
  visible: boolean;
  onClose: () => void;
  refetch: () => void;
};

const AddDestination: React.FC<AddDestinationProps> = ({
  visible,
  onClose,
  refetch,
}) => {
  const [createDestinationMutation] = useAddDestinationMutation();

  const [form] = Form.useForm();

  const handleSubmit = async (values: DestinationFormValues) => {
    try {
      await createDestinationMutation(values).unwrap();
      message.success("Destination added successfully");
      form.resetFields();
      onClose();
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.data?.error || "Failed to add destination!");
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
