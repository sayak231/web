import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Protected = () => {
  const PROTECTED_ = gql`
    query {
      protected {
        id
        firstname
      }
    }
  `;

  const { loading, error, data } = useQuery(PROTECTED_, {
    fetchPolicy: "network-only",
  });
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }
  if (!data || !data.protected) {
    return <div>Plz login....</div>;
  }

  return (
    <div>
      {data.protected.firstname} {data.protected.id}
    </div>
  );
};

export default Protected;
