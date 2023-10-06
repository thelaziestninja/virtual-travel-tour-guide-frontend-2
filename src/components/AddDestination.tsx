import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { DestinationFormValues } from "../utils/types";
import { useCreateDestination } from "../hooks/useDestinations";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

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
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input the destination name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please input the country!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.List name="image_url">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...field}
                  label="Image URL"
                  key={field.key}
                  required={false}
                >
                  <Input
                    style={{ width: "80%" }}
                    onChange={(e) => {
                      const newValues = [...form.getFieldValue("image_url")]; // get current image_url values
                      newValues[index] = e.target.value; // update the specific item
                      form.setFieldsValue({ image_url: newValues }); // set updated image_url values
                    }}
                  />
                  <Button
                    type="dashed"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove
                  </Button>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Image URL
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="best_time_to_visit"
          label="Best Time to Visit"
          rules={[
            { required: true, message: "Please input the best time to visit!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDestination;
