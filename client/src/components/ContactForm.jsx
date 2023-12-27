import React, { useRef, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

function ContactForm() {
  const formRef = useRef(null);
  let [submitted, setSubmitted] = useState(false);

  const onFinish = (values) => {
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3003/contact", data)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {
        if (formRef.current) {
          setTimeout(() => {
            formRef.current.resetFields();
          }, 100);
        }
      });
  };
  const phoneNumberRegex = /^\d{10}$/;

  return (
    <div className="contactFormPage">
      <h1>Contact us for an Estimate!!!</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: phoneNumberRegex,
              message: "Please enter a valid phone number format.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City/State"
          name="cityState"
          rules={[
            {
              required: true,
              message: "Please input your city and state!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: "Please input your message!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {submitted && (
          <div className="alert">
            Thank you for submitting contact request, We will get back to you
            ASAP.
          </div>
        )}
      </Form>
    </div>
  );
}

export default ContactForm;
