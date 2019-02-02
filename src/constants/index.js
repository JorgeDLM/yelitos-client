export const SERVER_URL = 'https://yelitos.herokuapp.com';

export const axiosConfig = (path, method, data) => ({
  method: method || 'get',
  url: `${SERVER_URL}/api${path}`,
  data: data || {}
});


