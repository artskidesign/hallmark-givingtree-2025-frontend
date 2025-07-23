import Axios, { AxiosPromise } from 'axios';
import GetConfig from '../../helpers/GetConfig';

const CallApi: <T>(url: string, method: string, data?: object) => AxiosPromise<T> = (url, method, data) => {
  const { apiUrl } = GetConfig();

  const request = {
    method,
    url: `${apiUrl}${url}`,
    headers: {
      Pragma: 'no-cache',
    },
  };
  if (method && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
    if (data) {
      /* @ts-ignore */
      request.data = data;
    }
          /* @ts-ignore */
    request.headers['Content-Type'] = 'application/json';
  }
          /* @ts-ignore */
  return Axios(request) as AxiosPromise<T>;
};

export default CallApi;
