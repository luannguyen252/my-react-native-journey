import AsyncStorage from '@react-native-community/async-storage';

const axios = require('axios');

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('com.dailymealz.userInfo');
    console.log('READ HEADER', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const BASE_URL = 'http://34.107.36.142';

export default {
  BASE_URL: 'http://34.107.36.142/api',
  Register: '/api/register',
  TokenCreate: '/api/token/',
  Todo: '/todo/',
  Refresh: '/api/token/refresh/',
};

const getHeaders = async (IsToken) => {
  let Token = await getData();
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (IsToken) {
    headers.Authorization = `Bearer ${Token['access']}`;
  }
  return headers;
};

class Api {
  static async create(IsToken) {
    return axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: await getHeaders(IsToken),
    });
  }

  static async get(IsToken, ...args) {
    let server = await this.create(IsToken);

    return server.get(...args).catch((error) => {
      return error;
    });
  }

  static async put(IsToken, ...args) {
    let server = await this.create(IsToken);

    return server.put(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }

  static async post(IsToken, ...args) {
    let server = await this.create(IsToken);

    return server.post(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }

  static async patch(IsToken, ...args) {
    let server = await this.create(IsToken);

    return server.patch(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }

  static async delete(IsToken, ...args) {
    let server = await this.create(IsToken);

    return server.delete(...args).catch((error) => {
      console.log(error);
      return error;
    });
  }
}

export {Api};
