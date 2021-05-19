import axios from 'axios';

import JwtService from './jwt.service';

import { API_BASE_URL } from './config';

const ApiService = {
  init: () => {
    axios.defaults.baseURL = API_BASE_URL;
  },

  setHeader: () => {
    axios.defaults.headers.common.Authorization = `Discogs token ${JwtService.getToken()}`;
    axios.defaults.headers.common['User-Agent'] = 'DiscogsClone/0.1 +http://discogsclone.com';
  },

  query: async (resource, params) => {
    try {
      return await axios.get(resource, params);
    } catch (error) {
      throw new Error(`The following error occurred while fetching: ${error}`);
    }
  },

  get: async (resource, slug = '') => {
    try {
      return await axios.get(`${resource}${slug === '' ? '' : '/'}${slug}`);
    } catch (error) {
      throw new Error(`The following error occurred while fetching: ${error}`);
    }
  },

  post: async (resource, payload) => {
    try {
      return await axios.post(`${resource}`, payload);
    } catch (error) {
      throw new Error(`The following error occurred while posting: ${error}`);
    }
  },

  update: async (resource, slug, payload) => {
    try {
      return await axios.put(`${resource}/${slug}`, payload);
    } catch (error) {
      throw new Error(`The following error occurred while updating: ${error}`);
    }
  },

  put: async (resource, payload) => {
    try {
      return await axios.put(`${resource}`, payload);
    } catch (error) {
      throw new Error(`The following error occurred while putting: ${error}`);
    }
  },

  delete: async (resource) => {
    try {
      return await axios.delete(resource);
    } catch (error) {
      throw new Error(`The following error occurred while deleting: ${error}`);
    }
  }
};

export default ApiService;
