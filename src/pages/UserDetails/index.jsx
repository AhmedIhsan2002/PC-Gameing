import "./style.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./../../config/api";

function UserDetails() {
  const { id } = useParams();

  return <Details id={id} />;
}

function Details({ id }) {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData({
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <ul className="users_details">
      <h3>{userData.name} Details:</h3>
      {isLoading ? (
        "Loading..."
      ) : (
        <li className="details">
          <div>Id: {userData.id}</div>
          <div>Name: {userData.name}</div>
          <div>Email: {userData.email}</div>
        </li>
      )}
    </ul>
  );
}

export default UserDetails;
