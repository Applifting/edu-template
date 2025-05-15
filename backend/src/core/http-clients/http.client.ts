import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type GetParameters = Parameters<typeof axios.get>;
type PostParameters = Parameters<typeof axios.post>;
type PutParamenters = Parameters<typeof axios.put>;

@Injectable()
export class HttpClient {
  readonly #instance = axios.create();

  get<T>(...args: GetParameters): Promise<AxiosResponse<T>> {
    return this.#instance.get<T>(...args);
  }

  post<T>(...args: PostParameters): Promise<AxiosResponse<T>> {
    return this.#instance.post<T>(...args);
  }

  put<T>(...args: PutParamenters): Promise<AxiosResponse<T>> {
    return this.#instance.put<T>(...args);
  }

  formPost<T>(
    url: string,
    data: Record<string, string>,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> {
    const requestData = new URLSearchParams();

    for (const [key, value] of Object.entries(data)) {
      requestData.append(key, value);
    }

    const requestConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return this.#instance.post<T>(url, requestData, requestConfig);
  }
}
