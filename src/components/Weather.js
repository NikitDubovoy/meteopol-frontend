import Today from "./Today";
import HoursList from "./HoursList";

const Weather = (props) => {
  const {
    imageBackground,
    weatherList,
    currentWeather,
    setCurrentWeather,
    selectHours,
    setSelectHoursHours,
    setCurrentUser,
  } = props;

  const backgroundImageUrl = imageBackground.name
    ? require(`../img/midjourney/optimization/${imageBackground.name}`)
    : null;

  const pageStyle = {
    backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
  };
  const mainStyle = {
    backgroundColor: imageBackground.priorityСolor,
  };

  return (
    <div className="page" style={pageStyle}>
      <main className="main" style={mainStyle}>
        {Object.keys(currentWeather).length ? (
          <Today
            currentWeather={currentWeather}
            setCurrentUser={setCurrentUser}
          ></Today>
        ) : null}
        <HoursList
          selectHours={selectHours}
          setSelectHoursHours={setSelectHoursHours}
          weatherList={weatherList}
          setCurrentWeather={setCurrentWeather}
        ></HoursList>
      </main>
    </div>
  );
};

export default Weather;
