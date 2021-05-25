import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { PROTECTED_ } from "../Queries";

const Protected = () => {
  const { loading, error, data } = useQuery(PROTECTED_, {
    fetchPolicy: "network-only",
  });
  console.log("Protected data", data);
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log("Protected error", error);
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
