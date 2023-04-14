import React, { useEffect, useState } from "react";

const HoursWeather = (props) => {
  const { weather, setCurrentWeather, selectHours, setSelectHoursHours } =
    props;
  const currentHours = new Date().getHours();
  const hours = new Date(weather.date.local).getHours();
  const formatHours = ("0" + hours).slice(-2);
  const [hoursWeatherClassName, setHoursWeatherClassName] =
    useState("hours-weather");
  const [currentWeatherClassName, setCurrentWeatherClassName] = useState(
    "hours-weather__current"
  );
  const [iconClassName, setIconClassName] = useState(
    "hours-weather__mini-icon"
  );

  const icon = weather.icon
    ? require(`../img/icon-weather/${weather.icon}.svg`)
    : null;

  const iconStyleBackgroung = {
    backgroundImage: icon ? `url(${icon})` : null,
  };

  const floorTime = (hours) => {
    return Math.floor(hours / 3) * 3;
  };

  useEffect(() => {
    if (floorTime(hours) === floorTime(selectHours)) {
      setHoursWeatherClassName("hours-weather hours-weather_active");
      setIconClassName(
        "hours-weather__mini-icon hours-weather__mini-icon_active"
      );
    } else {
      setHoursWeatherClassName("hours-weather");
      setIconClassName("hours-weather__mini-icon");
    }
  }, [selectHours]);

  useEffect(() => {
    if (floorTime(hours) === floorTime(currentHours)) {
      setCurrentWeatherClassName(
        "hours-weather__current hours-weather__current_active"
      );
    } else {
      setCurrentWeatherClassName("hours-weather__current");
    }
  });

  const handleWeather = () => {
    setCurrentWeather(weather);
    setSelectHoursHours(hours);
  };

  return (
    <div className={hoursWeatherClassName} onClick={handleWeather}>
      <span className="hours-weather__current-hour">{`${formatHours} : 00`}</span>
      <p className={currentWeatherClassName}>Сейчас</p>
      <h2 className="hours-weather__temperature">
        {`${Math.round(weather.temperature.air.C)}°С`}
      </h2>
      <ul className="hours-weather__mini-info">
        <li className="hours-weather__precipitation">
          {`${Math.round(weather.temperature.comfort.C)}°С`}
        </li>
        <li className={iconClassName} style={iconStyleBackgroung}></li>
      </ul>
    </div>
  );
};
export default HoursWeather;
