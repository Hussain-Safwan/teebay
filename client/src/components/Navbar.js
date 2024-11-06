import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userQuery = gql`
    query User {
      user @client {
        firstname
      }
    }
  `;
  const res = useQuery(userQuery);
  const profileName = res?.data ? `Hi ${res.data.user.firstname}!` : "Profile";
  return (
    <div className="navbar">
      <div className="logo">Teebay</div>
      <div className="user-profile" onClick={() => navigate("/profile")}>
        {profileName}
      </div>
    </div>
  );
};

export default Navbar;
