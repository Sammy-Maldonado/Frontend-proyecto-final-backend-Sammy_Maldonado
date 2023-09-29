import AxiosClient from "./axiosClient";
import { getJSONheaders } from "../utils/http";
const baseUrl = import.meta.env.VITE_BAKCEND_URL;

export default class SessionsService {
  constructor() {
    this.client = new AxiosClient();
    this.baseURL = `${baseUrl}/api/sessions`
  }

  currentUser = () => {
    const requestInfo = {
      url:`${this.baseURL}/current`,
      config: getJSONheaders()
    };
    return this.client.makeGetRequest(requestInfo);
  }

  logoutUser = (body) => {
    const requestInfo = {
      url:`${this.baseURL}/logout`,
      body,
      config:getJSONheaders()
    }
    return this.client.makePostRequest(requestInfo);
  }
}