import React, { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import Weather from "./Weather";
import { sypexgeoApi } from "../utils/sypexgeoApi";
import { UserContext } from "../context/CurrentUserContext";
import { serpApi } from "../utils/serpApi";
import { weatherApi } from "../utils/weatherApi";
import { createGetBackground } from "../components/createGetBackground";
import { getBackgroundImage } from "../utils/getBackgroundApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [geodata, setGeodata] = useState({});
  const [weatherToday, setWeatherToday] = useState([]);
  const [imageBackground, setImageBackground] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [selectHours, setSelectHoursHours] = useState(new Date().getHours());
  const [isDownloadWeatherApi, setDownloadWeatherApi] = useState(false);
  const [isDownloadSypexgeoApi, setDownloadSypexgeoApi] = useState(false);
  const [isDownloadImage, setDownloadImage] = useState(false);
  const [isDownloadDownloadAll, setDownloadDownloadAll] = useState(false);
  const [phenomenon, setPhenomen] = useState("Ясно");
  const date = new Date().getHours();
  const unixDate = new Date().getTime();

  const compareDates = (date1, date2, timesone) => {
    const formatDate = (date) => {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth();
      const day = new Date(date).getDate();
      return {
        year,
        month,
        day,
      };
    };

    const currentDate = formatDate(date1);
    const comparableDate = formatDate(date2);

    return (
      currentDate.year === comparableDate.year &&
      currentDate.month === comparableDate.month &&
      currentDate.day === comparableDate.day
    );
  };

  const floorTime = (hours) => {
    const floorHours = Math.floor(hours / 3) * 3;
    if (floorHours === 24) {
      return 0;
    } else {
      return floorHours;
    }
  };

  const getPositionUser = new Promise((resolve, reject) => {
    let geo = { lat: 0, lon: 0 };
    const succes = (position) => {
      geo = {
        lat: position.coords.latitude ? position.coords.latitude : 0,
        lon: position.coords.longitude ? position.coords.longitude : 0,
      };
      resolve(geo);
    };

    const error = () => {
      resolve(geo);
    };

    if (!navigator.geolocation) {
      reject("Ошибка получения данных местопложения");
    } else {
      navigator.geolocation.getCurrentPosition(succes, error);
    }
  });

  useEffect(() => {
    if (Object.keys(currentWeather).length) {
      const image = createGetBackground(
        currentWeather.cloudiness.type,
        currentWeather.storm,
        currentWeather.precipitation.type,
        currentWeather.phenomenon
      );

      getBackgroundImage(image)
        .getImages()
        .then((data) => {
          setImageBackground(data);
          setImagePath(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setDownloadImage(true));
    }
  }, [weatherToday]);

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      if (currentUser.geolocation.lat && currentUser.geolocation.lon) {
        weatherApi(currentUser.geolocation)
          .getWeather()
          .then((data) => {
            const weather = data.response.filter((weather) => {
              if (
                compareDates(
                  unixDate + weather.date.time_zone_offset * 60 * 1000,
                  Date.parse(weather.date.local)
                )
              )
                return weather;
            });

            setWeatherToday(weather);
          })
          .catch((err) => console.log(err))
          .finally(() => setDownloadWeatherApi(true));
      }
    }
  }, [currentUser.geolocation]);

  useEffect(() => {
    sypexgeoApi()
      .getIp()
      .then((data) => {
        getPositionUser
          .then((geo) => {
            setCurrentUser({
              ip: data.ip,
              geolocation: {
                lat: geo.lat ? geo.lat : data.city.lat,
                lon: geo.lon ? geo.lon : data.city.lon,
                country: data.country.name_ru,
                region: data.region.name_ru,
                city: data.city.name_ru,
              },
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => setDownloadSypexgeoApi(true));
  }, []);

  useEffect(() => {
    weatherToday.find((weather) => {
      if (floorTime(date) === new Date(weather.date.local).getHours())
        setCurrentWeather(weather);
    });
  }, [weatherToday]);

  useEffect(() => {
    if (isDownloadWeatherApi && isDownloadSypexgeoApi && isDownloadImage) {
      setTimeout(() => {
        setDownloadDownloadAll(true);
      }, 3000);
    }
  }, [isDownloadWeatherApi, isDownloadSypexgeoApi, isDownloadImage]);

  return (
    <UserContext.Provider value={currentUser}>
      <SplashScreen
        isDownloadDownloadAll={isDownloadDownloadAll}
      ></SplashScreen>
      <Weather
        imageBackground={imagePath}
        setPhenomen={setPhenomen}
        selectHours={selectHours}
        setSelectHoursHours={setSelectHoursHours}
        currentWeather={currentWeather}
        setCurrentWeather={setCurrentWeather}
        weatherList={weatherToday}
        setCurrentUser={setCurrentUser}
      ></Weather>
    </UserContext.Provider>
  );
}

export default App;
