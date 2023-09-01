// import axios from "axios";
// import { useState } from "react";

// export const fetchCountries = async () => {
//   const config = {
//     method: "get",
//     url: "https://www.universal-tutorial.com/api/countries/",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJyYWh1bHBzOTk1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Im9HRGNnYjdPZ2FTM3NkNmJXNHZRV0dDUEJBTzhnNlRRczVnMmdVM0pSUXVXb3h2VFFUc0pGZE9nZWVYNFRCeXAzVFkifSwiZXhwIjoxNjkzNTUwMTU0fQ.oNNi417wdhLrWHq50zFYvXt038J4KYfUybeLPcAqJxc",
//       Accept: "application/json",
//     },
//   };

//   try {
//     const response = await axios(config);
//     const countries = response.data.map((country) => ({
//       value: country.country_short_name,
//       label: country.country_name,
//     }));
//     console.log("here", countries);
//     return countries;
//   } catch (error) {
//     console.log(error);
//   }
// try {
//   // const response = await axios.get("https://restcountries.com/v2/all");
//   // const countryData = response.data.map((country) => ({
//   //   value: country.alpha2Code,
//   //   label: country.name,
//   // }));
//   // return countryData;
// } catch (error) {
//   console.error("Error fetching countries:", error);
// }
//};
