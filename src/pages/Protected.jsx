import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { PROTECTED_ } from "../Queries";

const Protected = () => {
  const [getCurrentUser, { loading, error, data }] = useLazyQuery(PROTECTED_, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getCurrentUser();
    }
    return () => {
      isMounted = false;
    };
  }, [getCurrentUser]);
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
      This route is protected by {data.protected.firstname} {data.protected.id}
    </div>
  );
};

export default Protected;
