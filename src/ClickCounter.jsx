import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ...

const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);
  const [clickFeel, setClickFeel] = useState(1);
  const [colors, setColors] = useState(['red', 'green', 'blue']);
  const [timer, setTimer] = useState(30);
  const [result, setResult] = useState([]);
  const [resultHistory, setResultHistory] = useState([]);
  const [disableButtons, setDisableButtons] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  const logout = () => {
    localStorage.clear('user');
    navigate('/signup');
  };

  const handleClick = (name) => {
    const feel = prompt(`Enter the feel for ${name} click (default is 1):`);
    const clickCount = feel ? parseInt(feel, 10) : 1;

    setClicks((prevClicks) => prevClicks + clickCount);
    setClickFeel(clickCount);

    setResult([...result, { name, clickCount }]);
  };

  const handleType = (size) => {
    const feel = prompt(`Enter the feel for ${size} click (default is 1):`);
    const clickCount = feel ? parseInt(feel, 10) : 1;

    setClicks((prevClicks) => prevClicks + clickCount);
    setClickFeel(clickCount);

    setResult([...result, { size, clickCount }]);
  };

  const resetGame = () => {
    setClicks(0);
    setClickFeel(1);
    setTimer(30);
    setResult([]);
    setDisableButtons(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        setDisableButtons(prevTimer <= 4);
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      const colorCounts = result.reduce((acc, { name, clickCount }) => {
        acc[name] = (acc[name] || 0) + clickCount;
        return acc;
      }, {});

      const winnerColor = Object.keys(colorCounts).reduce((a, b) =>
        colorCounts[a] < colorCounts[b] ? a : b, ''
      );

      const typeCounts = result.reduce((acc, { size, clickCount }) => {
        acc[size] = (acc[size] || 0) + clickCount;
        return acc;
      }, {});

      const winnerSize = Object.keys(typeCounts).reduce((a, b) =>
        typeCounts[a] < typeCounts[b] ? a : b, ''
      );

      alert(`Result: Color - ${winnerColor} and Size - ${winnerSize} received the Minimum Amount!`);

      setResultHistory((prevHistory) => [...prevHistory, { clicks, winnerColor, winnerSize }]);
      resetGame();
    }
  }, [timer, clicks, result]);


  return (
    <div>
      <h1>Amount Add Counter</h1>
      <p>Time Left: {timer} seconds</p>
      <div>
        {colors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color, color: 'white', width: '15vw', height: '6vh', marginLeft: '1rem' }}
            onClick={() => handleClick(color)}
            disabled={disableButtons}
          >
            {color}
          </button>
        ))}
      </div>
      <div>
        <button style={{  width: '15vw', height: '6vh', marginLeft: '1rem' , marginTop:'2rem' }} onClick={() => handleType('Big')} disabled={disableButtons}>Big</button>
        <button style={{   width: '15vw', height: '6vh', marginLeft: '1rem', marginTop:"2rem"}} onClick={() => handleType('Small')} disabled={disableButtons}>Small</button>
      </div>
      <p>Total Amount: {clicks}</p>
      <p>Add Amount: {clickFeel}</p>

      <h3>Result History:</h3>
      <ul>
        {resultHistory.slice().reverse().map(({ clicks, winnerColor, winnerSize }, index) => (
          <li key={index}>
            Round {resultHistory.length - index}: Winner - Color: {winnerColor}, Size: {winnerSize}
          </li>
        ))}
      </ul>
      <div>
        <Link onClick={logout} className="StyledLink" to="/signup">
          Logout ({JSON.parse(auth).username})
        </Link>
      </div>
    </div>
  );
};

export default ClickCounter;
