//import { requestInterface } from 'src/apis/apiUtils/interfacesAndTypes.js';
import { api } from './interceptors';

export const axiosRepository = {
  request: async (requestModal) =>
    await api.request(JSON.parse(JSON.stringify(requestModal)))
};
