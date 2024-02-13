import React, { useState, useEffect } from 'react';
import fcmlogo from "./images/logo/fcmlogo.jpeg";
import "./styles/Login.css";
import { Navbar, Container } from "react-bootstrap";

const PendingActivate = () => {
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [expanded, setExpanded] = useState(false);
  
  // Function to resend activation link
  const resendActivationLink = () => {
    // Your logic to resend activation link here
    console.log('Resending activation link...');
  };

  // Function to handle timer countdown
  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setTimerRunning(false); // Stop the timer when it reaches 0
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);

      // Clear the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  return (
    <>
      <Navbar expanded={expanded} expand="lg" className="navbar navbar-text-white" variant="light">
        <a href="/"> <img src={fcmlogo} alt="" className="me-5 custom-navbar-icon"  /> </a>
        <Container>
          {/* Your content within the Container */}
        </Container>
      </Navbar>
      <div className="mt-3" style={{ fontSize: '24px' }}>Activation link sent to email</div>
      {/* {timerRunning && <div style={{ fontSize: '18px' }}>Resend activation link in {timer} seconds</div>}
      {!timerRunning && (
        <button onClick={resendActivationLink} style={{ fontSize: '18px' }}>Resend Activation Link</button>
      )} */}
    </>
  );
};

export default PendingActivate;
