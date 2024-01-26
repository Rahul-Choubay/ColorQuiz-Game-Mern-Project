// MyAccount.jsx

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./MyAccount.css"; // Import the CSS file

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  return (
    <div className="my-account-container">
      <div className="profile-container">
        <Navbar />
        <div className="profile-header">
          <h2>Welcome to your Profile</h2>
        </div>
        {userInfo && (
          <div className="user-info">
            <p>
              <strong>Name:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Date Of Birth:</strong> {userInfo.dateOfBirth}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
