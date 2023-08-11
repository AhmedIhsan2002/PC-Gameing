import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./../../config/api";
import { NavLink } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(res.data.name);
        setEmail(res.data.email);
        setAdmin(res.data.isAdmin);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="profile_card">
          <p>Name: {username}</p>
          <p>Email: {email}</p>
        </div>
      )}

      {admin && (
        <NavLink to="/userslist" className={"userslist"}>
          Users List
        </NavLink>
      )}
    </div>
  );
}

export default Profile;
