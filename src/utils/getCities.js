import { backendUrl } from "./const";

export const getCities = (nameCity) => {
  function getAppInfo() {
    return Promise.all([getCity()]);
  }

  function getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(data);
  }
  const getCity = () => {
    const body = {
      nameCity: nameCity,
    };
    return fetch(`${backendUrl}/getCity`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return getResponseData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { getCity };
};
