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
      url: this.baseURL,
      config:getJSONheaders()
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

  changeRole = (userId) => {
    const requestInfo = {
      url:`${this.baseURL}/premium/${userId}`,
      config:getJSONheaders()
    }
    return this.client.makePutRequest(requestInfo);
  }
  
}