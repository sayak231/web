import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Register = ({ history }) => {
  const SIGNUP_ = gql`
    mutation Register(
      $email: String!
      $password: String!
      $firstname: String!
      $lastname: String!
    ) {
      signup(
        email: $email
        password: $password
        firstname: $firstname
        lastname: $lastname
      )
    }
  `;

  const [createUser, { loading }] = useMutation(SIGNUP_, {
    onError: (err) => {
      console.log("onError", err);
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          const { data, errors } = await createUser({
            variables: { email, password, firstname, lastname },
          });
          console.log("succes", data, errors);
          history.push("/");
        } catch (e) {
          console.error("error", e);
        }
      }}
    >
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <button disabled={loading} type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
