import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/CurrentUserContext";
import CitiesList from "./CitiesList";
import { getCities } from "../utils/getCities";
import locationImg from "../img/location/location.svg";
import humidity from "../img/location/humidity.svg";
import presures from "../img/location/presure.svg";
import rains from "../img/location/rains.svg";
import wind from "../img/location/wind.svg";

const Today = (props) => {
  const { currentWeather, setCurrentUser } = props;
  const currentUser = useContext(UserContext);
  const [region, setRegion] = useState("");
  const [location, setLocation] = useState("");
  const [citeis, setCities] = useState([]);
  const [isCitiesList, setCitiesList] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationUser = (lat, lon, city, country, region, region_type) => {
    setCurrentUser({
      ...currentUser,
      geolocation: {
        ...currentUser.geolocation,
        lat: lat,
        lon: lon,
        city: city,
        country: country,
        region: `${region} ${region_type}`,
      },
    });
  };

  useEffect(() => {
    if (location.length >= 3) {
      getCities(location)
        .getCity()
        .then((cities) => {
          setCities(cities);
        });
    }
  }, [location.length]);

  const icon = currentWeather.icon
    ? require(`../img/icon-weather/${currentWeather.icon}.svg`)
    : null;

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      setRegion(
        `${currentUser.geolocation.city}, ${currentUser.geolocation.region}`
      );
      setLocation(region);
    }
  }, [currentUser]);

  useEffect(() => {
    if (citeis.length != 0) {
      setCitiesList(true);
    }
  }, [citeis]);

  useEffect(() => {
    setLocation(region);
  }, [region]);

  return (
    <div className="today">
      <ul className="today__main">
        <li>
          <img className="today__weather-icon" src={icon}></img>
          <p className="today__weather">{currentWeather.description.full}</p>
        </li>
        <li className="today__temperature">
          {`${Math.round(currentWeather.temperature.air.C)}°С`}
        </li>
        <li className="today__info">
          Данные о погоде предоставлены сервисом{" "}
          <a
            className="today__link"
            href="https://www.gismeteo.ru/"
            target="_blank"
          >
            gismeteo.ru
          </a>
        </li>
        <li className="today__location">
          <form className="today__location-form">
            <label>
              <img className="today__location-icon" src={locationImg}></img>
              <input
                className="today__location-input"
                value={location || ""}
                onChange={handleLocationChange}
              ></input>
              <CitiesList
                list={citeis}
                handleLocationUser={handleLocationUser}
                isCitiesList={isCitiesList}
              />
            </label>
          </form>
        </li>
      </ul>
      <ul className="today-details">
        <li className="today-details__block">
          <img className="today-details__icon" src={humidity}></img>
          <h3 className="today-details__title">
            Влажность
            <span className="today-details__value">
              {" "}
              {currentWeather.humidity.percent}%
            </span>
          </h3>
        </li>
        <li className="today-details__block">
          <img className="today-details__icon" src={presures}></img>
          <h3 className="today-details__title">
            Атмосферное давление
            <span className="today-details__value">
              {" "}
              {currentWeather.pressure.mm_hg_atm} мм.р.ст
            </span>
          </h3>
        </li>
        <li className="today-details__block">
          <img className="today-details__icon" src={rains}></img>
          <h3 className="today-details__title">
            Осадки
            <span className="today-details__value">
              {" "}
              {currentWeather.precipitation.amount} мм
            </span>
          </h3>
        </li>
        <li className="today-details__block">
          <img className="today-details__icon" src={wind}></img>
          <h3 className="today-details__title">
            Скорость ветра
            <span className="today-details__value">
              {currentWeather.wind.speed.m_s} м/с
            </span>
          </h3>
        </li>
      </ul>
    </div>
  );
};

export default Today;
