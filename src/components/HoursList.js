import HoursWeather from "./HoursWeather";

const HoursList = (props) => {
  const { weatherList, setCurrentWeather, setSelectHoursHours, selectHours } =
    props;

  let i = 0;
  return (
    <div className="hours-list">
      {weatherList.map((weather) => (
        <HoursWeather
          weather={weather}
          selectHours={selectHours}
          setSelectHoursHours={setSelectHoursHours}
          setCurrentWeather={setCurrentWeather}
          key={i++}
        ></HoursWeather>
      ))}
    </div>
  );
};

export default HoursList;
