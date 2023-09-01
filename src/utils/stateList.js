import axios from "axios";

// Function to generate the API token
export const generateAuthToken = async () => {
  try {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "api-token":
        "oGDcgb7OgaS3sd6bW4vQWGCPBAO8g6TQs5g2gU3JRQuWoxvTQTsJFdOgeeX4TByp3TY",
      "user-email": "rahulps995@gmail.com",
    };

    const response = await axios.get(
      "https://www.universal-tutorial.com/api/getaccesstoken"
    );

    const authToken = await response.data.auth_token;
    // console.log("auth", authToken);
    return authToken;
  } catch (error) {
    console.error("Error generating auth token:", error);
    throw error; // You can choose to throw the error for further handling
  }
};

// Function to fetch states using the access token
export const fetchStatesByCountry = async (accessToken, countryCode) => {
  console.log("here", accessToken);
  console.log("here", countryCode);

  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    const response = await axios.get(
      `https://www.universal-tutorial.com/api/states/${countryCode}`
    );
    const res = response.data;
    const states = res.map((state) => ({
      value: state.state_name,
      label: state.state_name,
    }));
    console.log("?????????????", states);
    return states;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error; // You can choose to throw the error for further handling
  }
};

// Function to fetch the list of countries
export const fetchCountries = async (accessToken) => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    const response = await axios.get(
      "https://www.universal-tutorial.com/api/countries/"
    );

    const countries = response.data.map((country) => ({
      value: country.country_short_name,
      label: country.country_name,
    }));
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // You can choose to throw the error for further handling
  }
};
