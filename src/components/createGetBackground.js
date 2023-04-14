export const createGetBackground = (cloudiness, storm, precipitation, fog) => {
  const nameImage = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentHours = now.getHours();

  if (currentMonth >= 2 && currentMonth <= 11) {
    nameImage.season = "summer";
  } else {
    nameImage.season = "winter";
  }

  if (
    (currentHours >= 18 && currentHours < 24) ||
    (currentHours >= 6 && currentHours < 9)
  ) {
    nameImage.times = "e";
  } else if (currentHours >= 9 && currentHours < 18) {
    nameImage.times = "noon";
  } else {
    nameImage.times = "nigth";
  }

  if (cloudiness === 0) {
    nameImage.cloudiness = "c";
  } else if (cloudiness > 0) {
    nameImage.cloudiness = "g";
  } else if (storm) {
    nameImage.cloudiness = "st";
  } else if (precipitation === 1) {
    nameImage.cloudiness = "r";
  } else if (precipitation === 2 || precipitation === 3) {
    nameImage.cloudiness = "s";
  }

  if (
    fog === 11 ||
    fog === 12 ||
    fog === 28 ||
    (fog >= 40 && fog <= 49) ||
    fog === 120 ||
    (fog >= 130 && fog <= 135)
  ) {
    nameImage.fog = "f";
  } else {
    nameImage.fog = 0;
  }
  return nameImage;
};
