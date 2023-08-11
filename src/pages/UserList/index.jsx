import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./../../config/api";
import { NavLink } from "react-router-dom";

function UserList() {
  const [username, setUsername] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const username = localStorage.getItem("name");
        setUsername(username);

        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllUsers(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`${API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        setIsDeleting(false);
      } catch (error) {
        console.log(error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="all_users">
      <p>{username}</p>
      <ol className="users_list">
        <div className="user_title">All Users</div>
        {isLoading
          ? "Loading .. "
          : isDeleting
          ? "Deleting.."
          : allUsers.map((user) => (
              <li className="user_card" key={user._id}>
                <NavLink className="email-link" to={`${user._id}`}>
                  <p>{user.email}</p>
                </NavLink>
                <button
                  className="delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </li>
            ))}
      </ol>
    </div>
  );
}

export default UserList;
