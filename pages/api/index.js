import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${changeableUrl}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=502";

    const { data } = await axios.get(url);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};

export const fecthHistoicalDataForCountries = async (country) => {
  let url = "https://disease.sh/v3/covid-19/historical/" + country;

  if (!country) {
    return;
  }

  try {
    const {
      data: {
        timeline: { cases, deaths, recovered },
      },
    } = await axios.get(url);
    return { cases, deaths, recovered };
  } catch (err) {
    console.log(err);
  }
};
