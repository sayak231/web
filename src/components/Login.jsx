import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const Login = ({ loading, handleSubmit, graphQlError }) => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={({ email, password }) => handleSubmit(email, password)}
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

export default Login;
