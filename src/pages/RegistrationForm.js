import React, { useEffect, useRef, useState } from "react";
import { checkValidData } from "../utils/validation";
import "react-phone-number-input/style.css"; // Import the styles
import PhoneInput from "react-phone-number-input";
import Select from "react-select";

import {
  fetchCountries,
  fetchStatesByCountry,
  generateAuthToken,
  //getStatesByCountry,
} from "../utils/stateList";
const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);
  const phone = useRef("");
  const zipCode = useRef(null);
  const secondName = useRef(null);
  const addressLine1 = useRef(null);
  const addressLine2 = useRef(null);
  const state = useRef(null);

  const [states, setStates] = useState([]);
  console.log(" statesss", states);
  // const state = [
  //   { value: "us", label: "United States" },
  //   { value: "ca", label: "Canada" },
  //   { value: "mx", label: "Mexico" },
  //   //Add more countries as needed
  // ];
  const [countriesList, setCountriesList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({
    value: "IN",
    label: "India",
  });
  console.log("selectedCountry", selectedCountry);
  const [selectedState, setSelectedState] = useState("");

  const [countryDataFetched, setCountryDataFetched] = useState(false);
  const [stateDataFetched, setStateDataFetched] = useState(false);
  const [Token, setToken] = useState("");
  // const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(phone.current.value);
    console.log("handle button click");
    const message = checkValidData(
      email.current.value,
      // password.current.value,
      zipCode.current.value,
      addressLine1.current.value,
      addressLine2.current.value
    );
    console.log(message);
    setErrorMessage(message);

    // if (message === true) {
    //   navigate("/browse");
    // }
    if (message == true) {
      const user = {
        firstName: firstName.current.value,
        secondName: secondName.current.value,
        email: email.current.value,
        addressLine1: addressLine1.current.value,
        addressLine2: addressLine2.current.value,
        zipCode: zipCode.current.value,
        phone: phone.current,
        selectedCountry: selectedCountry.value,
        selectedState: selectedState.value,
      };
      console.log(user);
    }
  };

  const handlePhoneChange = (value) => {
    phone.current = value; // Store the updated phone number
    console.log(phone, "phoneeeee");
  };

  useEffect(() => {
    // fetchStatesByCountry();
    async function fetchData() {
      try {
        const accessToken = await generateAuthToken(); // Generate the API token
        setToken(accessToken);
        const countryData = await fetchCountries(accessToken); // Fetch countries using the token
        // console.log("first countryData", countryData);
        // // Set the countriesList state after fetching data
        setCountriesList(countryData);
        setCountryDataFetched(true); // Mark that country data has been fetched
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      console.log("state fetch", selectedCountry.label);
      const stateData = await fetchStatesByCountry(
        Token,
        selectedCountry.label
      );

      setStates(stateData);
      setStateDataFetched(true); //Mark that states have been fetched
    }
    fetchStates();
  }, [selectedCountry]);
  return (
    <div className="flex items-center justify-center mt-3 ">
      <div className="flex flex-col w-1/2 bg-black bg-opacity-80 rounded-md  ">
        <h1 className=" items-center justify-center  text-white  p-2 m-5  text-4xl font-bold ">
          Registration Form
        </h1>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          {errorMessage ? (
            <h1 className="ml-5 font-semibold text-xl text-yellow-600 ">
              Warning : {errorMessage}
            </h1>
          ) : null}
          <div className="flex ">
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  bg-gray-600  text-white text-xl"
              type="text"
              placeholder="First Name"
              ref={firstName}
            />
            <input
              className="m-4 p-2 rounded-lg h-12  w-1/2 bg-gray-600  text-white text-xl"
              type="text"
              placeholder="Second Name"
              ref={secondName}
            />
          </div>

          <input
            className="m-4 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="text"
            placeholder="Email"
            ref={email}
          />
          <input
            className="m-4 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="text"
            placeholder="addressLine 1"
            ref={addressLine1}
          />
          <input
            className="m-4 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="text"
            placeholder="addressLine 2"
            ref={addressLine2}
          />
          <input
            className="m-4 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="text"
            placeholder="zip"
            ref={zipCode}
          />
          {/* <input
            className="m-5 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="password"
            placeholder="Password"
            ref={password}
          /> */}
          <PhoneInput
            className="m-4 p-2 rounded-lg h-12 bg-gray-600 text-black text-xl"
            defaultCountry={selectedCountry.value}
            placeholder="Phone"
            value={phone.current}
            onChange={handlePhoneChange}
          />

          {countryDataFetched && (
            <Select
              className="m-4 p-2 rounded-lg h-12 bg-gray-600 text-black text-xl"
              placeholder="Select country"
              options={countriesList}
              value={selectedCountry}
              onChange={setSelectedCountry}
              //isMulti // Enable multi-select
            />
          )}

          {stateDataFetched && (
            <Select
              className="m-4 p-2 rounded-lg h-12 bg-gray-600 text-black text-xl"
              placeholder="Select state"
              options={states}
              value={selectedState}
              onChange={setSelectedState}
              //isMulti // Enable multi-select
            />
          )}

          <button
            className="bg-red-600 text-white m-4 p-2 rounded-lg h-12 font-bold text-xl "
            onClick={handleButtonClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
