import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import fcmlogo from "../images/logo/fcmlogo.jpeg";
import "../styles/Login.css";
import { createBrowserHistory } from 'history'; 

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      // If login is successful, response.data will contain the JWT token
      const token = response.data.token;

      // Store the token securely on the client (e.g., in local storage or a state management solution)
      // For simplicity, you can use local storage for now:
      

      // Clear any previous error message
      setErrorMessage('');
      
      console.log('Account is active. Processing login...');
      localStorage.setItem('token', token);
      navigate('/homepage');
      
      // Set a success message
      // setSuccessMessage('Login Successful');
      
      // Redirect to a protected route or perform other actions based on successful login
      // For example, you can navigate to a dashboard:
      // history.push('/dashboard');
    } catch (err) {
      // Handle login failure and display an error message
      if (err.response.status === 403) {
        console.log('Account is pending. Redirecting...');
        navigate('/pending');
      }
      setSuccessMessage('');
      setErrorMessage(err.response?.data?.message || 'Login Failed');
    }
  };
  
  return (
    <div>
      <CustomNavbar />
      <div className="row">
        {/* Column for the image */}
        <div className="col-md-6">
          <img
            src={fcmlogo}
            alt="Description"
            className="img-fluid" // Bootstrap class for responsive images
          />
        </div>

        <div className="col-md-6">
          <div className="card custom-login-box">
            <div className="card-header p-5">Login</div>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group p-1">
                  <label htmlFor="email">Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="custom-login-loginbutton">
                  Login
                </button>
                <Link to="/register">
                  <button className="custom-login-registerbutton">
                    Don't have an account yet? Sign up here!
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
