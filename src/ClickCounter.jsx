import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Wallet from './Wallet';

const ClickCounter = () => {
  const initialBalance = parseInt(localStorage.getItem('balance'), 10) || 0;
  const [balance, setBalance] = useState(initialBalance);
  const [clicks, setClicks] = useState(0);
  const [totalFeelAmount, setTotalFeelAmount] = useState(0);
  const [colors, setColors] = useState(['red', 'green', 'blue']);
  const [timer, setTimer] = useState(30);
  const [result, setResult] = useState([]);
  const [resultHistory, setResultHistory] = useState([]);
  const [disableButtons, setDisableButtons] = useState(false);
  const navigate = useNavigate();
  const [updateBalance, setUpdateBalance] = useState(false);
  const [lossHistory, setLossHistory] = useState([]);
  const [hasUserParticipated, setHasUserParticipated] = useState(false);
  const [activeSection, setActiveSection] = useState('resultHistory');
  
  const [gameHistory, setGameHistory] = useState([]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleDeposit = (amount) => {
    setHasUserParticipated(true);
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount;
      localStorage.setItem('balance', newBalance);
      return newBalance;
    });
  };

  const handleWithdraw = (amount) => {
    setHasUserParticipated(true);
    setBalance((prevBalance) => {
      const newBalance = prevBalance - amount;
      localStorage.setItem('balance', newBalance);
      return newBalance;
    });
  };
  const handleClick = (name) => {
    const feel = prompt(`Enter the feel for ${name} amount:`) || '0';
    const clickCount = parseInt(feel, 10);
  
    if (isNaN(clickCount) || clickCount < 0) {
      alert('Invalid input. Please enter a non-negative number.');
      return;
    }
  
    if (clickCount > balance) {
      alert('Insufficient balance');
      return;
    }
  
    setClicks((prevClicks) => 0 +clickCount);
    setTotalFeelAmount((prevTotal) => 0 + clickCount);
    setResult([...result, { name, clickCount }]);
    setHasUserParticipated((prevHasUserParticipated) => {
      // Ensure the state is updated synchronously
      if (!prevHasUserParticipated) {
        console.log("hasUserParticipated:", true);
        return true;
      }
      return prevHasUserParticipated;
    });
  };
  
  const handleType = (size) => {
    const feel = prompt(`Enter the feel for ${size} amount:`) || '0';
    const clickCount = parseInt(feel, 10);
  
    if (isNaN(clickCount) || clickCount < 0) {
      alert('Invalid input. Please enter a non-negative number.');
      return;
    }
  
    if (clickCount > balance) {
      alert('Insufficient balance');
      return;
    }
  
    setClicks((prevClicks) => 0 + clickCount);
    setTotalFeelAmount((prevTotal) => 0 + clickCount);
    setResult([...result, { size, clickCount }]);
    setHasUserParticipated(true);
    console.log("hasUserParticipated:", hasUserParticipated);
  };
  const handleNumber = (number) => {
    const feel = prompt(`Enter the feel for ${number} amount:`) || '0';
    const clickCount = parseInt(feel, 10);
  
    if (isNaN(clickCount) || clickCount < 0) {
      alert('Invalid input. Please enter a non-negative number.');
      return;
    }
  
    if (clickCount > balance) {
      alert('Insufficient balance');
      return;
    }
  
    setClicks((prevClicks) => 0 + clickCount);
    setTotalFeelAmount((prevTotal) => 0 + clickCount);
    setResult([...result, { number, clickCount }]);
    setHasUserParticipated(true);
    console.log("hasUserParticipated:", hasUserParticipated);
  };
  useEffect(() => {
    if (clicks === 0) {
      setHasUserParticipated(false);
    }
  }, [clicks]);
  

  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    setBalance((prevBalance) => prevBalance - totalFeelAmount);
  }, [clicks, result, totalFeelAmount]);

  const resetGame = () => {
    setClicks(0);
    setTotalFeelAmount(0);
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

      const numberCounts = result.reduce((acc, { number, clickCount }) => {
        acc[number] = (acc[number] || 0) + clickCount;
        return acc;
      }, {});

      const winnerNumber = Object.keys(numberCounts).reduce((a, b) =>
        numberCounts[a] < numberCounts[b] ? a : b, ''
      );

      const isWinner = result.length > 0;
      const isLoser = result.length === 0;

      if (isWinner) {
        const doubledAmount = clicks * 2 / 2; // Double the amount

        const gameResult = {
          clicks,
          winnerColor,
          winnerSize,
          winnerNumber,
          doubledAmount,
          isWinner,
        };

        setGameHistory((prevHistory) => [...prevHistory, gameResult]);

        setBalance((prevBalance) => prevBalance + doubledAmount);

        alert(`Result: Color - ${winnerColor}, Size - ${winnerSize}, and Number - ${winnerNumber} received the Minimum Amount!`);
      } else {
        setLossHistory((prevLossHistory) => [...prevLossHistory, { clicks, isLoser }]);
      }

      // Reset game logic
      setClicks(0);
      setTotalFeelAmount(0);
      setTimer(30);
      setResult([]);
      setDisableButtons(false);

      // Always update resultHistory regardless of user participation
      setResultHistory((prevHistory) => [
        ...prevHistory,
        { clicks, winnerColor, winnerSize, winnerNumber, isWinner }
      ]);
    }
  }, [timer, clicks, result]);
  useEffect(() => {
    if (resultHistory.length > 0) {
      // Get the last entry in resultHistory (the most recent winner)
      const { clicks } = resultHistory[resultHistory.length - 1];
      const doubledAmount = clicks * 2 /2; // Double the amount
      setBalance((prevBalance) => prevBalance + doubledAmount);
    }
  }, [resultHistory]);

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
      <div style={{ width: "30vw", border: "1px solid black", height: "auto", overflow: "hidden" }}>
        <Navbar />
        <div>
          <h1 style={{ width: "30vw", height: "7vh", border: "0.5px solid black", color: "white", backgroundColor: "#fe0002" }}>Color Quiz Game</h1>
          <Wallet balance={balance} onDeposit={handleDeposit} onWithdraw={handleWithdraw} />

          <div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "40%",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <p style={{ width: "40%", border: "0.5px solid black", backgroundColor: "#f0f0f0" }}>Time Left:<span> 00 :{timer}</span>  seconds</p>
           
            <Link style={{border:"0.5px solid black", backgroundColor:"#f0f0f0" ,textDecoration:"none", marginLeft:'0.5rem'}} to="/">
          How To Play
        </Link>
          </div>
          <div>
            {colors.map((color, index) => (
              <button
                key={index}
                style={{ backgroundColor: color, color: 'white', width: '25%', height: '6vh', marginLeft: '1rem' }}
                onClick={() => handleClick(color)}
                disabled={disableButtons}
              >
                {color}
              </button>
            ))}
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1%",
            marginTop: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button key={num}  onClick={() => handleNumber(num)}
              disabled={disableButtons} style={{ width: '10%', height: "6vh", borderRadius: "19rem", border: "0.5px solid black", backgroundColor: "#f0f0f0" }}>{num}</button>
            ))}
          </div>
          <div>
            <button style={{ width: '25%', height: '6vh', marginLeft: '1rem', marginTop: '2rem' }} onClick={() => handleType('Big')} disabled={disableButtons}>Big</button>
            <button style={{ width: '25%', height: '6vh', marginLeft: '1rem', marginTop: "2rem" }} onClick={() => handleType('Small')} disabled={disableButtons}>Small</button>
          </div>

       
          <div>
      <h3>Result History:</h3>
      <div>
        <button onClick={() => toggleSection('resultHistory')}>
          {activeSection === 'resultHistory' ? 'Hide Result History' : 'Show Result History'}
        </button>
        <button onClick={() => toggleSection('winAmountHistory')}>
          {activeSection === 'winAmountHistory' ? 'Hide Win Amount History' : 'Show Win Amount History'}
        </button>
        {activeSection === 'resultHistory' && (
          <ul style={{ width: '26.2vw', marginLeft: '0.3rem', overflowY: 'scroll', overflowX: 'hidden', height: '31vh', border: '0.5px solid black' }}>
            {resultHistory.slice().reverse().map(({ clicks, winnerColor, winnerSize, winnerNumber }, index) => {
              const doubledAmount = clicks * 2; // Double the amount
              return (
                <li key={index} style={{ width: '24.2vw', marginRight: '3rem', marginTop: '0.2rem', height: '3vh', border: '0.5px solid black', justifyContent: 'center', alignItems: 'center' }}>
                  {resultHistory.length - index}: Winner - Color: {winnerColor}, Size: {winnerSize} , Number: {winnerNumber}
                </li>
              );
            })}
          </ul>
        )}
{activeSection === 'winAmountHistory' && (
  <ul style={{ width: '26.2vw', marginLeft: '0.3rem', overflowY: 'scroll', overflowX: 'hidden', height: '31vh', border: '0.5px solid black' }}>
    {resultHistory.slice().map(({ clicks, winnerColor, winnerSize, winnerNumber, isWinner }) => {
      const doubledAmount = clicks * 2; // Double the amount
      const listItemContent = isWinner ? (
        <>
          Winner : Winning Amount: {doubledAmount} 
          
        </>
      ) : (
        clicks > 0 ? 'Lost' : null
      );

      return { listItemContent };
    }).filter(({ listItemContent }) => listItemContent).map(({ listItemContent }, index) => {
      const serialNumber = index + 1;
      return (
        <li key={`history-item-${serialNumber}`} style={{ width: '24.2vw', marginRight: '3rem', marginTop: '0.2rem', height: '3vh', border: '0.5px solid black', justifyContent: 'center', alignItems: 'center' }}>
          {serialNumber}: {listItemContent}
        </li>
      );
    })}
  </ul>
)}


      </div>
    </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ClickCounter;