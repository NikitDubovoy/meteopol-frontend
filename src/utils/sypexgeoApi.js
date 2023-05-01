export const sypexgeoApi = () => {
  const url = "http://api.sypexgeo.net/";

  function getAppInfo() {
    return Promise.all([getIp()]);
  }

  function getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(data);
  }

  const getIp = () => {
    return fetch(`${url}`, {
      headers: {
        Accept: "*/*",
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return getResponseData(res);
    });
  };

  return { getIp };
};
