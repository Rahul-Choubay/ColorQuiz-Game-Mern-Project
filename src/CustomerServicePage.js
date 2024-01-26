import React from 'react';
import Navbar from './Navbar';
import './CustomerServicePage.css'; // Import the CSS file

const CustomerServicePage = () => {
  return (
    <div className="customer-service-container">
      <div className="customer-service-content">
        <Navbar />
        <h1>Contact Customer Service</h1>
        <p>If you have any questions or issues, please feel free to reach out to our customer service team.</p>

        <div className="contact-information">
          <h2>Contact Information:</h2>
          <p>Email: support@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>


        <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mzbldgal"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;

