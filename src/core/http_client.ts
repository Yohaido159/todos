import axios from "axios";

export namespace HttpClient {
  export interface Base {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
    put<T>(url: string, data: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
    getHeader(key: string): string;
    setHeader(key: string, value: string): void;
  }

  export interface Authorized extends Base {
    getAuthorizationHeader(): string;
  }
}

class HttpClient implements HttpClient.Base {
  headers: { [key: string]: string };
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }
  get(url: string): Promise<any> {
    return axios.get(url, { headers: this.headers });
  }

  post(url: string, data: any): Promise<any> {
    return axios.post(url, data, { headers: this.headers });
  }

  put(url: string, data: any): Promise<any> {
    return axios.put(url, data, { headers: this.headers });
  }

  delete(url: string): Promise<any> {
    return axios.delete(url, { headers: this.headers });
  }

  getHeader(key: string): string {
    return this.headers[key];
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }
}

class AuthHttpClient extends HttpClient implements HttpClient.Authorized {
  constructor() {
    super();
    this.headers = {
      ...this.headers,
      Authorization: this.getAuthorizationHeader(),
    };
  }

  getAuthorizationHeader(): string {
    return `Bearer ${localStorage.getItem("token")}`;
  }
}

export { HttpClient, AuthHttpClient };
