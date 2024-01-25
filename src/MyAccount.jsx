import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";


const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  return (
<div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
      <div style={{ width: "30vw", border: "1px solid black", height: "auto", overflow: "hidden" }}> 
      <Navbar />
      <h2>Welcome to your Profile</h2>
      {userInfo && (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Date Of Birth</strong> {userInfo.dateOfBirth}
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default MyAccount;