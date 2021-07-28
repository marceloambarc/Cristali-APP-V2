import axios from 'axios';
import { pagSeguroAPI ,token } from '../../credentials';


const pgapi = axios.create({
  baseURL: `${pagSeguroAPI}`,
  headers: {
      'Authorization': `${token}`,
      'x-api-version': '4.0',
      'Content-Type': 'application/json'
    }
});

export { pgapi }