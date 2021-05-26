import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP_ } from "../Queries";
import SignUp from "../components/Register";
import { getErrorMessage } from "../utils/getError";

const Register = ({ history }) => {
  const [error, setError] = useState("");
  const [createUser, { loading }] = useMutation(SIGNUP_, {
    onError: (err) => {
      console.log("onError", err);
      setError(getErrorMessage(err));
    },
  });

  const handleSubmit = async (email, password, firstname, lastname) => {
    try {
      const { data, errors } = await createUser({
        variables: { email, password, firstname, lastname },
      });
      console.log("succes", data, errors);
      history.push("/login");
    } catch (e) {
      console.error("error", e);
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");

  return (
    <SignUp
      loading={loading}
      handleSubmit={handleSubmit}
      graphQlError={error}
    />
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <input
    //       type="text"
    //       value={email}
    //       placeholder="Email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <input
    //       type="password"
    //       placeholder="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       value={firstname}
    //       placeholder="firstname"
    //       onChange={(e) => setFirstname(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       value={lastname}
    //       placeholder="lastname"
    //       onChange={(e) => setLastname(e.target.value)}
    //     />
    //   </div>
    //   <button disabled={loading} type="submit">
    //     Register
    //   </button>
    // </form>
  );
};

export default Register;