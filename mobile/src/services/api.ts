import axios from 'axios';
import { baseAPI } from '../../credentials';

const api = axios.create({
  baseURL: `${baseAPI}`,
})

export { api }