import { backendUrl } from "./const";

export const weatherApi = (geolocation) => {
  function getAppInfo() {
    return Promise.all([getWeather()]);
  }

  function getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(data);
  }

  const getWeather = () => {
    const body = {
      geolocation: geolocation,
    };
    return fetch(`${backendUrl}/getWeather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

  return { getWeather };
};
