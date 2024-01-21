import React from 'react';
import styled from 'styled-components';


const SignUpButtons = ({ setRole }) => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button onClick={() => setRole('signin')}>Signin</Button>
      <Button onClick={() => setRole('login')}>Login</Button>

    </div>
  );
};

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default SignUpButtons;
