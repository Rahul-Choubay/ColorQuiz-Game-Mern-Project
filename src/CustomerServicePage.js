import React from 'react';
import Navbar from './Navbar';

const CustomerServicePage = () => {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
    <div style={{ width: "30vw", border: "1px solid black", height: "auto", overflow: "hidden" }}> 
    <Navbar />
      <h1>Contact Customer Service</h1>
      <p>If you have any questions or issues, please feel free to reach out to our customer service team.</p>

      <div>
        <h2>Contact Information:</h2>
        <p>Email: support@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>

      <div>
        <h2>Submit a Support Ticket:</h2>
        <form>
          <label>
            Name:
            <input type="text" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" />
          </label>
          <br />
          <label>
            Message:
            <textarea rows="4" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CustomerServicePage;
