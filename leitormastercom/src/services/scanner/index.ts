import { AxiosResponse } from 'axios';
import api from '../index';
const path = 'leitor';

interface responseReader {
  ID: string;
  valor: string;
}

export const getProductByCode = async (
  code: string
): Promise<responseReader> => {
  const response = await api.get<responseReader>(`${path}/${code}`, {
    headers: {
      Authorization: `Basic bWFzdGVyOm1hc3RlcjEwMjAzMA==`,
    },
  });
  return response.data;
};

export const postProductByCode = async (
  payload: responseReader
): Promise<AxiosResponse<any, any>> => {
  const response = await api.post(`${path}`, payload, {
    headers: {
      Authorization: `Basic bWFzdGVyOm1hc3RlcjEwMjAzMA==`,
    },
  });
  return response.data;
};
