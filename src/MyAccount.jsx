import React, { useEffect, useState } from "react";


const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  return (
    <div className="profile-container">
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
  );
};

export default MyAccount;