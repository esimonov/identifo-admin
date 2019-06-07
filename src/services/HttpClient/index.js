import axios from 'axios';

axios.defaults.withCredentials = true;

const createHttpClient = () => {
  const middlewares = [];

  const applyMiddlewares = (initialRequest = {}) => {
    return middlewares.reduce((request, applyChanges) => {
      return request.then(applyChanges);
    }, Promise.resolve(initialRequest));
  };

  const httpGet = async (url, request) => {
    const result = await applyMiddlewares(request);
    return axios.get(url, result);
  };

  const httpPost = async (url, body, request) => {
    const result = await applyMiddlewares(request);
    return axios.post(url, body, result);
  };

  const httpPut = async (url, body, request) => {
    const result = await applyMiddlewares(request);
    return axios.put(url, body, result);
  };

  const httpPatch = async (url, body, request) => {
    const result = await applyMiddlewares(request);
    return axios.patch(url, body, result);
  };

  const httpDelete = async (url, request) => {
    const result = await applyMiddlewares(request);
    return axios.delete(url, result);
  };

  const addMiddleware = (middleware) => {
    middlewares.push(middleware);
  };

  return Object.freeze({
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
    patch: httpPatch,
    addMiddleware,
  });
};

export default createHttpClient;
