import React from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

type FormFieldProps = {
  name: string;
  label: string;
  requiredMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  isTextArea?: boolean;
  isList?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  form,
  requiredMessage,
  isTextArea,
  isList,
}) => {
  if (isList) {
    return (
      <Form.List name={name}>
        {(fields, { add, remove, ...restField }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item key={field.key} label={label} required={false}>
                <Input
                  style={{ width: "80%" }}
                  {...restField}
                  onChange={(e) => {
                    const newValues = [...form.getFieldValue(name)];
                    newValues[index] = e.target.value;
                    form.setFieldsValue({ [name]: newValues });
                  }}
                />
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </Form.Item>
            ))}
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={
                <PlusOutlined
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              }
            >
              Add {label}
            </Button>
          </>
        )}
      </Form.List>
    );
  }
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: requiredMessage }]}
    >
      {isTextArea ? <Input.TextArea /> : <Input />}
    </Form.Item>
  );
};

export default FormField;
