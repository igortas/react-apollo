import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, dataSet] = useState('');

  const fn = async () => {
    const res = await fetch('http://localhost:4000/');
    console.log('bbb', res);
    const data = await res.json();
    console.log('111', data);
    dataSet(data);
  };

  useEffect(() => {
    fn();
  }, []);
  return <div className='App'>{data.toString()}</div>;
}

export default App;
