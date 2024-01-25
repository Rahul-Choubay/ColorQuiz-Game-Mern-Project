import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar =()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
      localStorage.clear();
      navigate('/signup');
    };
    return(
        <div>
     <Link style={{border:"0.5px solid black", backgroundColor:"#f0f0f0",textDecoration:"none", marginLeft:'0.5rem'}} to="/gamepage">
          Home
        </Link>
            <Link style={{border:"0.5px solid black", backgroundColor:"#f0f0f0",textDecoration:"none", marginLeft:'0.5rem'}} to="/profile">
          Profile
        </Link>
        <Link style={{border:"0.5px solid black", backgroundColor:"#f0f0f0" ,textDecoration:"none", marginLeft:'0.5rem'}} to="/coustomer">
          Customer Service
        </Link>
        <Link onClick={logout} className="StyledLink" style={{ border: "0.5px solid black", backgroundColor: "#f0f0f0", fontSize:"0.8rem",marginLeft:'0.5rem',fontWeight:'350' }} to="/">
              Logout ({JSON.parse(auth).username})
            </Link>
       
        </div>
    )
}
export default Navbar;