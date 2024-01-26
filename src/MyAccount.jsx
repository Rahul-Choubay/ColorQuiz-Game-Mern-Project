import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./MyAccount.css"; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
      localStorage.clear();
      navigate('/signup');
  };

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
        <div style={{display:"flex", flexDirection:"column"}}>
        <Link to="/edit-profile" style={{ width: "15vw", height: "5vh", marginTop: "1rem" }}>Edit Your Profile</Link>
         <button style={{width:"15vw", height:"5vh", marginTop:"1rem"}}><Link onClick={logout} >
                Logout ({JSON.parse(auth).username})
            </Link></button>
            </div>
      </div>
     
    </div>
  );
};

export default MyAccount;
