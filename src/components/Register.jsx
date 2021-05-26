import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const Register = ({ loading, handleSubmit, graphQlError }) => {
  const schema = yup.object().shape({
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={({ email, password, firstname, lastname }) =>
          handleSubmit(email, password, firstname, lastname)
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
              />
              {errors.firstname && touched.firstname && errors.firstname}
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              />
              {errors.lastname && touched.lastname && errors.lastname}
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting || loading}>
                Submit
              </button>
            </form>
            {graphQlError}
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
