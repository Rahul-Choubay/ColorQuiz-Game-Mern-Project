import React, { useEffect, useState } from "react";
import './App.css';
import {useParams, useNavigate} from "react-router-dom";

const ProfileUpdate=()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
const navigate = useNavigate();
const params = useParams();
useEffect(()=>{
    console.warn(params)
    getProductDetails();
},[])
const getProductDetails = async () => {
    try {
      console.warn(params);
      const url = `http://localhost:6600/user/${params.id}`;
      console.log('Request URL:', url);
  
      let result = await fetch(url);
      let data = await result.json();
      setUsername(data.username);
      setPassword(data.password);
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
const Updateitem = async () => {
    console.warn(username, password, email);
    try {
      let result = await fetch(`http://localhost:6600/user/${params.id}`, {
        method: 'put',
        body: JSON.stringify({ username, password, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
  
      let data = await result.json();
      console.warn(data);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
    return(
        <div className="register">
            
         <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Name" />
          <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button className="appbutton" onClick={Updateitem} type="submit">Update Product</button>
        </div>
    )
}
export default ProfileUpdate;