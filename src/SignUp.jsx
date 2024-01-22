import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth)
      {
        navigate('/gamepage')
      }
  })

  const collectData = async () => {
    try {
        const result = await fetch("http://localhost:6600/register", {
            method: 'post',
            body: JSON.stringify({ username, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        console.warn(data);
       if (data.username,password,email){
            localStorage.setItem("user", JSON.stringify(data));
            navigate('/')
        }
    } catch (error) {
        alert("pleases enter correct details");
    }
  
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%' }}>
        <form style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ justifyContent: 'center', textAlign: 'center' }}>User Sign Up</h2>
          <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Name" />
          <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input style={{ height: '6vh', marginBottom: '0.4rem' }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button style={{ height: '6vh', marginTop: '1rem' }} onClick={collectData} type="submit">Sign Up</button>
        </form>
    </div>
  );
};

export default SignUp;