import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
  headers: {
    'Content-type': 'application/json',
  },
});

console.log(`http-common iniciado em ${process.env.PORT}`);
