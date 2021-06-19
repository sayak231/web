import React from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_ } from "../Queries";
import SignUp from "../components/Register";
import { getErrorMessage } from "../utils/getError";

const Register = ({ history }) => {
  const [createUser, { loading, error }] = useMutation(SIGNUP_);

  const handleSubmit = async (email, password, firstname, lastname) => {
    try {
      const response = await createUser({
        variables: { email, password, firstname, lastname },
      });
      if (response && response.data) {
        history.push("/login");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <SignUp
      loading={loading}
      handleSubmit={handleSubmit}
      graphQlError={error ? getErrorMessage(error) : null}
    />
  );
};

export default Register;
