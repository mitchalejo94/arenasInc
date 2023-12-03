import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  let navigate = useNavigate();
  let [submitted, setSubmitted] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    cityState: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email("Valid Email is required").required(),
    phoneNumber: Yup.string().required(),
    cityState: Yup.string().required(),
    message: Yup.string().required(),
  });

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3003/contact", data).then((response) => {
      setSubmitted(true);
      resetForm();
      setTimeout(() => {
        setSubmitted(false);
        // navigate("/contactList"); // change this later to "Thank you for submitting, redirect to Home page?. Or include alert message that Form was submitted" page.
      }, 9000).finally(() => {
        setSubmitted(false);
      });
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
          {() => (
            <Form className="formContainer">
              {submitted && (
                <div className="alert">Thank you for submitting</div>
              )}
              <div className="formGroup">
                <label htmlFor="name">Name:</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="First and last name..."
                />
                <ErrorMessage name="name" component="span" />
              </div>
              <div className="formGroup">
                <label htmlFor="email">Email:</label>
                <Field id="email" name="email" placeholder="Email..." />
                <ErrorMessage name="email" component="span" />
              </div>
              <div className="formGroup">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone number..."
                />
                <ErrorMessage name="phoneNumber" component="span" />
              </div>
              <div className="formGroup">
                <label htmlFor="cityState">City & State:</label>
                <Field
                  id="cityState"
                  name="cityState"
                  placeholder="City and State..."
                />
                <ErrorMessage name="cityState" component="span" />
              </div>
              <div className="formGroup">
                <label htmlFor="message">Description:</label>
                <Field
                  // as="textarea"
                  id="message"
                  name="message"
                  placeholder="Project description..."
                />
                <ErrorMessage name="message" component="span" />
              </div>
              <button type="submit">Submit contact information</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ContactForm;
