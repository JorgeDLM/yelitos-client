export const SERVER_URL = 'http://localhost:7000';

export const axiosConfig = (path, method, data) => ({
  method: method || 'get',
  url: `${SERVER_URL}/api${path}`,
  data: data || {}
});


