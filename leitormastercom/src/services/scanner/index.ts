import { AxiosResponse } from 'axios';
import api from '../index';
const path = 'leitor';

interface responseReader {
  id: string;
  valor: string;
}

export const getProductByCode = async (
  code: string
): Promise<responseReader> => {
  const response = await api.get<responseReader>(`${path}/leitor${code}`);
  return response.data;
};

export const postProductByCode = async (
  payload: responseReader
): Promise<AxiosResponse<any, any>> => {
  const response = await api.post(`${path}/leitor`, payload);
  return response.data;
};
