const CitiesList = (props) => {
  const { list, handleLocationUser, isCitiesList } = props;

  let i = 0;
  return (
    <ul
      className={
        isCitiesList ? "cities-list cities-list_active" : "cities-list"
      }
    >
      {list.map((cityObj) => {
        const { geo_lat, geo_lon, city, country, region, region_type } =
          cityObj;
        return (
          <li
            className="cities-list__li"
            onClick={() =>
              handleLocationUser(
                geo_lat,
                geo_lon,
                city,
                country,
                region,
                region_type
              )
            }
            key={i++}
            data-tooltip={`${cityObj.city}, ${cityObj.region} ${cityObj.region_type}`}
          >
            {`${cityObj.city}, ${cityObj.region} ${cityObj.region_type}`}
          </li>
        );
      })}
    </ul>
  );
};

export default CitiesList;
