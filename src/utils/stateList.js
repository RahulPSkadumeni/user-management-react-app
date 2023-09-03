import axios from "axios";
const apiKey = "dGptc3g2dndvWk1sb2c1Wll6N0xxaDJYOEtZUkIyZnkzdDN3dms2TA==";

// Function to fetch states using the access token
export const fetchStatesByCountry = async (countryCode) => {
  console.log("here>>>>>>>>>>>>>>>>>>>>>>>>>>> country code=", countryCode);

  const fetchData = async () => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY": apiKey,
      },
    };

    try {
      const response = await axios(config);
      console.log("stateeeeeeeeeeeeeeeeee", response.data);
      const states = response.data.map((state) => ({
        value: state.name,
        label: state.name,
      }));
      return states;
    } catch (error) {
      console.log(error);
    }
  };

  // Call the fetchData function
  return fetchData();
};

export const fetchCountries = async () => {
  async function fetchData() {
    const config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY": apiKey,
      },
    };

    try {
      const response = await axios(config);

      const countries = await response.data.map((country) => ({
        value: country.iso2,
        label: country.name,
      }));
      // console.log(">>>>>>", countries);
      return countries;
    } catch (error) {
      console.log(error);
    }
  }
  return fetchData();

  fetchData();
};
