import AxiosClient from "./axiosClient";
import { getJSONheaders } from "../utils/http";
const baseUrl = import.meta.env.VITE_BAKCEND_URL;

export default class ProductsService {
  constructor() {
    this.client = new AxiosClient();
    this.baseURL = `${baseUrl}/api/products`
  }

  getProducts = () => {
    const requestInfo = {
      url: this.baseURL,
      config: getJSONheaders()
    };
    return this.client.makeGetRequest(requestInfo);
  }

  getPagination = (currentPage) => {
    const requestInfo = {
      url: `${this.baseURL}/?page=${currentPage}`,
      config: getJSONheaders()
    };
    return this.client.makeGetRequest(requestInfo);
  }
}