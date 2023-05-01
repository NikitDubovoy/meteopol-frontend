import { backendUrl } from "./const";

export const getBackgroundImage = (parametrs) => {
  const { cloudiness, fog, season, times } = parametrs;
  const stringParam = `${season}_${times}_${cloudiness}_${fog}`;

  function getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(data);
  }

  const getImages = () => {
    return fetch(`${backendUrl}/getImage?text=${stringParam}`, {
      method: "GET",
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

  return { getImages };
};
