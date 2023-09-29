import AxiosClient from "./axiosClient";
import { getJSONheaders } from "../utils/http";
const baseUrl = import.meta.env.VITE_BAKCEND_URL;

export default class CartsService {
  constructor() {
    this.client = new AxiosClient();
    this.baseURL = `${baseUrl}/api/carts`
  }

  getCarts = () => {
    const requestInfo = {
      url: this.baseURL,
      config: getJSONheaders()
    };
    return this.client.makeGetRequest(requestInfo);
  }

  addProductToCart = (cid, pid, quantity) => {
    const requestInfo = {
      url: `${this.baseURL}/${cid}/product/${pid}`,
      body: JSON.stringify({ quantity }),
      config: getJSONheaders()
    };
    return this.client.makePostRequest(requestInfo);
  }

  purchaseCart = (cartId) => {
    const requestInfo = {
      url: `${this.baseURL}/${cartId}/purchase`,
      config: getJSONheaders()
    };
    return this.client.makePostRequest(requestInfo);
  }

  clearCart = (cartId) => {
    const requestInfo = {
      url: `${this.baseURL}/${cartId}`,
      config: getJSONheaders()
    };
    return this.client.makeDeleteRequest(requestInfo);
  }

  removeProdutFromCart = (cartId, productId) => {
    const requestInfo = {
      url: `${this.baseURL}/${cartId}/product/${productId}`,
      config: getJSONheaders()
    };
    return this.client.makeDeleteRequest(requestInfo);
  }
}