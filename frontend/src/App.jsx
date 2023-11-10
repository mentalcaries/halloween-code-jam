import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getRouteData } from './utils/api';
import { useEffect, useState } from 'react';

function App() {
  const [optimalRoute, setOptimalRoute] = useState('');
  const [totalDistance, setTotalDistance] = useState(0)

  useEffect(() => {
    getRouteData().then((data) => {

      const cities = data["Optimal Route"]
      let route = ''
      for(let city of cities){
        route = route + `${city}, `
      }

      setOptimalRoute(route);
      setTotalDistance(data["Total Distance"])
    });
  }, []);

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Jingle Bell Jam Test 🎅🏼</h1>
      <div className="card">
        <p className="read-the-docs">Optimal Route: {optimalRoute}</p>
        <p className="read-the-docs">Total Distance: {totalDistance}</p>
      </div>
    </>
  );
}

export default App;
