export const SERVER_URL = 'http://192.168.1.79:3000';

export const axiosConfig = (path, method, data) => ({
  method: method || 'get',
  url: `${SERVER_URL}/api${path}`,
  data: data || {}
});


