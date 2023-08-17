import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IFetchService } from './interfaces/fetch.interface';

export class FetchService implements IFetchService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  getClient(): AxiosInstance {
    return this.client;
  }

  async GET<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    const response = this.client.get<T, R, D>(url, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async POST<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.post<T, R, D>(url, data, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async PUT<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.put<T, R, D>(url, data, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async DELETE<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.delete<T, R, D>(url, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }
}
