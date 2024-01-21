import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';
import SignUpButtons from './SignUpButtons';


const HomePage = () => {
  const [role, setRole] = useState('signin');

  return (
    <div>
    <Containerr>
     <h1>Entry to game</h1>
      <SignUpButtons setRole={setRole} />
      {role === 'signin' && <SignUp />}
      {role === 'login' && <Login />}
    </Containerr>  
    </div>
  );
};
// Create a styled container to display items in a row
const Containerr = styled.div`
  display: flex;
  width:100vw;
  flex-direction: row;
  height: 100vh;
  overflow-x:hidden;
  align-items: center;
  background-color:#005987;

`;

export default HomePage;