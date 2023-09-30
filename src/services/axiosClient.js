import axios from "axios";

export default class AxiosClient {

  makeGetRequest = ({url, config}) => axios.get(url,config);
  makePostRequest = ({url, body, config}) => axios.post(url,body,config);
  makePutRequest = ({url, body, config}) => axios.put(url,body,config)
  makeDeleteRequest = ({url, config}) => axios.delete(url, config);
}