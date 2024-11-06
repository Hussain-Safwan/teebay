import React from "react";
import { gql, useQuery } from "@apollo/client";

const Navbar = () => {
  const userQuery = gql`
    query User {
      user @client {
        firstname
      }
    }
  `;
  const res = useQuery(userQuery);
  const profileName = res?.data ? `Hi ${res.data.user.firstname}!` : "Profile";
  console.log(res);

  return (
    <div className="navbar">
      <div className="logo">Teebay</div>
      <div className="user-profile">{profileName}</div>
    </div>
  );
};

export default Navbar;
