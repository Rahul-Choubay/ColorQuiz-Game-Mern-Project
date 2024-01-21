import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
 display: flex;
 width: 100vw;
overflow-x:hidden;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 100vh;
 background-color: #005987;
 color:white;
 .main{
    display: flex;
    flex-direction: row;
    gap:3rem;
    
 }
`;

const Title = styled.h1`
 font-size: 2rem;
 color: white;
 margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
 font-size: 1.5rem;
 color: white;
 margin-bottom: 2rem;
`;

const Button = styled.button`
 background-color: #007bff;
 color: white;
 border: none;
 border-radius: 5px;
 padding: 10px 20px;
 font-size: 1.2rem;
 cursor: pointer;
 margin-bottom: 1rem;

 &:hover {
    background-color: #0056b3;
 }
`;

const Form = styled.form`
 display: flex;
 flex-direction: column;
 width: 300px;
 max-width: 100%;
 margin-bottom: 2rem;
`;

const FormInput = styled.input`
 border: 1px solid #ccc;
 border-radius: 5px;
 padding: 10px;
 margin-bottom: 1rem;
 font-size: 1.2rem;
`;

const FormError = styled.div`
 color: red;
 font-size: 1.2rem;
 margin-bottom: 1rem;
`;

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 
 const navigate = useNavigate();
 const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      setError('');
      // Handle login logic here
    } else {
      setError('Please fill in all fields');
    }
 };
 useEffect(()=>{
  const auth = localStorage.getItem('user');
  if(auth)
  {
    navigate('/Dashboard')
  }
})
 
 const handlelogin = async () => {
     console.warn("email,password", email, password)
     let result = await fetch("http://localhost:6600/login", {
         method: 'post',
         body: JSON.stringify({ email, password }),
         headers: {
             'Content-Type': 'application/json'
         }
     });
     const data = await result.json()
     console.warn(data);
     if (data.email) {
         localStorage.setItem("user", JSON.stringify(data));
         navigate("/Dashboard")
         
     } else {
         alert("pleses enter corect details")
     }
 }

 return (<>
 <div>
    <Container>
       
     <div className='main'>
        <div className='divdata'>
      <Title>Log in</Title>
      <Subtitle>Good to see you again!</Subtitle>
      </div>
      <div>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
          required
         
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        
        />
        {error && <FormError>{error}</FormError>}
        <Button type="submit" onClick={handlelogin}>Login</Button>
      </Form>
      <a href="#" style={{color:"white"}}>Forgot password?</a>
      <p>Create an account</p>
      </div>
      </div>
    </Container>
    </div>
    </>
 );
};

export default Login;