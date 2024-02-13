import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { createBrowserHistory } from 'history'; 
const ActivateAccount = () => {
  const [setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const history = createBrowserHistory();
  
  useEffect(() => {
    const { search } = location;
    const token = new URLSearchParams(search).get('token');
    
    if (token) {
      axios.get(`http://localhost:5000/api/auth/activate?token=${token}`)
        .catch((err) => {
            console.error("Activation error:", err);
            setError('An error occurred.');
            setLoading(false);
        });
    } else {
      console.error("No activation token provided");
      setError('No activation token provided.');
      setLoading(false);
    }
  });



  if (error) {
    return <div>Error: {error}</div>;
  }
  else
  {
    history.push('/login');
    window.location.reload();
    return <div>Account successfully activated</div>;
  }

};

export default ActivateAccount;
