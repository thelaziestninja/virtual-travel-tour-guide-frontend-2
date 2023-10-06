// src/components/AddDestination.tsx
import React from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import { DestinationFormValues } from "../utils/types";
import { useCreateDestination } from "../hooks/useDestinations";

type AddDestinationProps = {
  visible: boolean;
  onClose: () => void;
};

const AddDestination: React.FC<AddDestinationProps> = ({
  visible,
  onClose,
}) => {
  const createDestinationMutation = useCreateDestination();

  const [form] = Form.useForm();

  const handleSubmit = (values: DestinationFormValues) => {
    console.log("Form values:", values);

    // // Filter out null, undefined, and empty string values from the image_url array
    // const cleaned_image_url = values.image_url?.filter(
    //   (url) => url !== null && url !== "" && url !== undefined
    // );

    // console.log("cleaned_image_url:", cleaned_image_url);

    // // Replace the image_url array in values with the cleaned_image_url array
    // const cleanedValues = { ...values, image_url: cleaned_image_url };

    // console.log("cleanedValues:", cleanedValues);

    createDestinationMutation.mutate(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
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
