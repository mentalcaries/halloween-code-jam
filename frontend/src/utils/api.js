const BASE_URL = 'https://api.jinglejamtest.twilightparadox.com/';

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