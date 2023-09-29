export const getJSONheaders = (additionalHeaders) => {
  return {
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      ...additionalHeaders
    },
    withCredentials: true
  }
}