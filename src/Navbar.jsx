import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div style={styles.navbar}>
            <Link to="/gamepage" style={styles.link}>
                Home
            </Link>
            <Link to="/profile" style={styles.link}>
                Profile
            </Link>
            <Link to="/customer" style={styles. Cuslink}>
                Customer Service
            </Link>
            <Link onClick={logout} style={styles.logoutLink}>
                Logout ({JSON.parse(auth).username})
            </Link>
        </div>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        background: '#f0f0f0',
        padding: '10px',
        borderBottom: '1px solid black',
    },
    link: {
        flex: 1,
        textDecoration: 'none',
        marginLeft: '10px',
        padding: '8px',
        color: 'black',
        fontSize: '1rem',
        fontWeight: '500',
        width:'15vw',
        height:"6vh",
        textAlign: 'center',
        border: '1px solid black',
        boxSizing: 'border-box', // Ensure border-box model to include padding and border in the width
        transition: 'background-color 0.3s',
    },
    Cuslink: {
        flex: 1,
        textDecoration: 'none',
        marginLeft: '10px',
        padding: '8px',
        color: 'black',
        fontSize: '0.7rem',
        fontWeight: '700',
        width:'15vw',
        height:"6vh",
        textAlign: 'center',
        border: '1px solid black',
        boxSizing: 'border-box', // Ensure border-box model to include padding and border in the width
        transition: 'background-color 0.3s',
    },
    logoutLink: {
        flex: 1,
        textDecoration: 'none',
        marginLeft: '10px',
        padding: '8px',
        color: 'black',
        width:'15vw',
        height:"6vh",
        fontSize: '0.6rem',
        fontWeight: '600',
        textAlign: 'center',
        border: '1px solid black',
        boxSizing: 'border-box',
        transition: 'background-color 0.3s',
    },
};

export default Navbar;
