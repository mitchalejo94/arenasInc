import React, { useRef, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import "./ContactForm.css";

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
  const phoneNumberRegex = /^(1\d{10}|\d{10})$/;

  return (
    <>
      <div className="contactFormTitle">
        <h1>Contact Form</h1>
      </div>
      <div className="cotactFormBody">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac ut
          consequat semper viverra nam libero justo. Viverra justo nec ultrices
          dui. Sed pulvinar proin gravida hendrerit lectus. Sem nulla pharetra
          diam sit. Pharetra et ultrices neque ornare aenean euismod elementum
          nisi quis. Imperdiet proin fermentum leo vel orci porta non pulvinar
          neque. Risus quis varius quam quisque id diam vel quam elementum. Ut
          sem nulla pharetra diam. Et ultrices neque ornare aenean euismod
          elementum nisi quis.
        </p>
        <p>
          Accumsan lacus vel facilisis volutpat est. Vitae aliquet nec
          ullamcorper sit amet risus. A erat nam at lectus urna duis convallis
          convallis. Sit amet justo donec enim diam. Faucibus purus in massa
          tempor nec feugiat nisl pretium fusce. Auctor urna nunc id cursus
          metus aliquam eleifend mi in. Ultricies mi eget mauris pharetra et
          ultrices. Ut lectus arcu bibendum at varius. Sit amet massa vitae
          tortor condimentum lacinia quis. Lacus vel facilisis volutpat est
          velit egestas dui id. Vitae congue eu consequat ac. Purus ut faucibus
          pulvinar elementum integer enim neque. Elit pellentesque habitant
          morbi tristique senectus et netus et. Vitae congue eu consequat ac
          felis donec et odio. Mattis pellentesque id nibh tortor id. Tempus
          urna et pharetra pharetra massa. Urna porttitor rhoncus dolor purus
          non.
        </p>
      </div>
      <div className="contactFormPage">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "auto", color: "blue" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          ref={formRef}
        >
          <div className="formItems">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please include your name!",
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
                  message: "Please input a valid email address",
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
                  message: "Please input a valid phone number",
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
          </div>
          {submitted && (
            <div className="alert">
              Thank you, for submitting contact request, We will contact you
              shortly.
            </div>
          )}
        </Form>
      </div>
    </>
  );
}

export default ContactForm;
