const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const checkServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};



const getRouteData = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkServerResponse)
    .then((data) => data);
};

// Put the registered URL here later

export { getRouteData };