import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bs-crud-back.herokuapp.com/',
});

// const api = axios.create({
//   baseURL: 'http://localhost:3333/',
// });

// const api = axios.create({
//   baseURL: 'http://localhost:5000/',
// });

export default api;
