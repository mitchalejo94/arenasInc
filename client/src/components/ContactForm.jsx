import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    cityState: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email("Valid Email is required").required(),

    cityState: Yup.string().required(),
    message: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3003/contact", data).then((response) => {
      navigate("/contactList");
    });
  };

  return (
    <>
      <div className="contactFormPage">
        <h1>Contact us for an estimate</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Name: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              id="inputContactForm"
              name="name"
              placeholder="First and last name..."
            />
            <label>Email: </label>
            <ErrorMessage name="email" component="span" />
            <Field id="inputContactForm" name="email" placeholder="Email..." />
            <label>City & State: </label>
            <ErrorMessage name="cityState" component="span" />
            <Field
              id="inputContactForm"
              name="cityState"
              placeholder="City and State..."
            />
            <label>Description: </label>
            <ErrorMessage name="message" component="span" />
            <Field
              id="inputContactForm"
              name="message"
              placeholder="Project description..."
            />
            <button type="submit">Submit contact information</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default ContactForm;
