export const googleApi = (nameCity) => {
  const googleUrl = "https://customsearch.googleapis.com/customsearch/v1";
  const API_KEY = "AIzaSyCBcJ0YKuQN89zIQGq-SQ4cjgy7WFSxVHI";
  const cx = "7625711ebe8404870";
  const search = `${googleUrl}?key=${API_KEY}&cx=${cx}&q=${nameCity} обои на рабочий стол&searchType=image`;

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
    return fetch(`${search}`, {
      method: "GET",
      mode: "no-cors",
      headers: {},
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
