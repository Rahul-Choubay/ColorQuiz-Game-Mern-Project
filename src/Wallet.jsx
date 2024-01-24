import React, { useState } from 'react';

const DepositPage = ({ onDeposit, showDeposit, onHide }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(amount);
      setDepositAmount('');
    } else {
      alert('Invalid deposit amount');
    }
  };

  return (
    <div style={{ display: showDeposit ? 'block' : 'none' }}>
      <h2>Deposit Page</h2>
      <input
        type="text"
        placeholder="Enter deposit amount"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={onHide}>Go To Home Page</button>
    </div>
  );
};

const WithdrawPage = ({ onWithdraw, balance, showWithdraw, onHide }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0) {
      if (amount > balance) {
        alert('Insufficient funds');
      } else {
        onWithdraw(amount);
        setWithdrawAmount('');
      }
    } else {
      alert('Invalid withdraw amount');
    }
  };

  return (
    <div style={{ display: showWithdraw ? 'block' : 'none' }}>
      <h2>Withdraw Page</h2>
      <input
        type="text"
        placeholder="Enter withdraw amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={onHide}>Go To Home Page</button>
    </div>
  );
};

const Wallet = ({ balance, onDeposit, onWithdraw }) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const toggleDepositPage = () => {
    setShowDeposit(!showDeposit);
    setShowWithdraw(false); // Hide Withdraw Page when Deposit Page is shown
  };

  const toggleWithdrawPage = () => {
    setShowWithdraw(!showWithdraw);
    setShowDeposit(false); // Hide Deposit Page when Withdraw Page is shown
  };

  const displayBalance = Math.max(balance, 0); // Ensure balance is non-negative

  return (
    <div>
      <h1>Wallet balance: {displayBalance}</h1>
      <button onClick={toggleDepositPage}>Show Deposit Page</button>
      <button onClick={toggleWithdrawPage}>Show Withdraw Page</button>
      <DepositPage onDeposit={onDeposit} showDeposit={showDeposit} onHide={toggleDepositPage} />
      <WithdrawPage onWithdraw={onWithdraw} balance={balance} showWithdraw={showWithdraw} onHide={toggleWithdrawPage} />
    </div>
  );
};

export default Wallet;
