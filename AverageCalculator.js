import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WINDOW_SIZE = 10;
const API_BASE_URL = 'https://test-server-api.com/numbers'; // Replace with the actual API URL

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState('p'); // Default to prime
  const [window, setWindow] = useState([]);
  const [prevWindow, setPrevWindow] = useState([]);
  const [error, setError] = useState(null);

  const fetchNumbers = useCallback(async () => {
    try {
      const response = await axios.get(${API_BASE_URL}/${numberType}, { timeout: 500 });
      const numbers = response.data.numbers.filter(num => !window.includes(num));
      
      setPrevWindow([...window]);
      let newWindow = [...window, ...numbers].slice(-WINDOW_SIZE);

      setWindow(newWindow);
    } catch (err) {
      setError('Failed to fetch numbers');
    }
  }, [numberType, window]);

  useEffect(() => {
    fetchNumbers();
  }, [numberType, fetchNumbers]);

  const calculateAverage = () => {
    if (window.length === 0) return 0;
    const sum = window.reduce((acc, num) => acc + num, 0);
    return (sum / window.length).toFixed(2);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {error && <p>{error}</p>}
      <pre>{JSON.stringify({
        windowPrevState: prevWindow,
        windowCurrState: window,
        numbers: window.slice(-WINDOW_SIZE),
        avg: calculateAverage(),
      }, null, 2)}</pre>
    </div>
  );
};

export default AverageCalculator;