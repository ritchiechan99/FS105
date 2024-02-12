import React, { useEffect } from 'react';
import axios from 'axios';

const ActivateAccount2 = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/activate');
        console.log('Response from /activate:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ActivateAccount2;
