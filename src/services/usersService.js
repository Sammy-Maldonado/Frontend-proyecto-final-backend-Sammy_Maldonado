import AxiosClient from "./axiosClient";
import { getJSONheaders } from "../utils/http";
const baseUrl = import.meta.env.VITE_BAKCEND_URL;

export default class UsersService {
  constructor() {
    this.client = new AxiosClient();
    this.baseURL = `${baseUrl}/api/users`
  }

  getUsers = () => {
    const requestInfo = {
      url: this.baseURL
    };
    return this.client.makeGetRequest(requestInfo);
  }

  createUser = (body) => {
    const requestInfo = {
      url:this.baseURL,
      body,
      config:getJSONheaders()
    }
    return this.client.makePostRequest(requestInfo);
  }

  logoutUser = (body) => {
    const requestInfo = {
      url:this.baseURL,
      body,
      config:getJSONheaders()
    }
    return this.client.makePostRequest(requestInfo);
  }
  
}