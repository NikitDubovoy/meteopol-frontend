import { backendUrl } from "./const";

export const serpApi = (phenomenon, screenWidth, screenHeight) => {
  const serpapiUrl = "/getImage";
  const parametrs = {
    text: `${phenomenon} небо фон`,
    engine: "yandex_images",
    orientation: "horizontal",
    file_type: "jpg",
    yandex_domain: "yandex.ru",
    width: screenWidth,
    height: screenHeight,
    site: "goodfon.ru",
  };

  function getAppInfo() {
    return Promise.all([getImages()]);
  }

  function getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(data);
  }

  const getImages = () => {
    return fetch(
      `${backendUrl}${serpapiUrl}?text=${parametrs.text}&engine=${parametrs.engine}&orientation=${parametrs.orientation}&file_type=${parametrs.file_type}&yandex_domain=${parametrs.yandex_domain}&width=${parametrs.width}&height=${parametrs.height}&site=${parametrs.site}`,
      {
        method: "GET",
      }
    )
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
