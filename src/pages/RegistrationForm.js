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
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
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

  const [countriesList, setCountriesList] = useState([]);
  const users = useSelector((state) => state.user);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "IN",
    label: "India",
  });
  console.log("selectedCountry", selectedCountry);
  const [selectedState, setSelectedState] = useState("");

  const [countryDataFetched, setCountryDataFetched] = useState(false);
  const [stateDataFetched, setStateDataFetched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [Token, setToken] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

    if (message === true) {
      let newUserId;
      if (users.length === 0) {
        newUserId = 1;
      } else {
        newUserId = users[users.length - 1].id + 1;
      }

      const user = {
        id: newUserId,
        firstName: firstName.current.value,
        secondName: secondName.current.value,
        email: email.current.value,
        addressLine1: addressLine1.current.value,
        addressLine2: addressLine2.current.value,
        zipCode: zipCode.current.value,
        phone: phone.current,
        country: selectedCountry,
        state: selectedState,
      };

      console.log(user);
      dispatch(addUser(user));
      navigate("/");
    }
  };

  const handlePhoneChange = (value) => {
    phone.current = value; // Store the updated phone number
    console.log(phone, "phoneeeee");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const countryData = await fetchCountries();
        console.log("heree>>>>>>>>", countryData);
        setCountriesList(countryData);
        console.log("countriesList", countriesList);
        setCountryDataFetched(true);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      console.log("state fetch", selectedCountry.value);
      const stateData = await fetchStatesByCountry(selectedCountry.value);

      setStates(stateData);
      setStateDataFetched(true); //Mark that states have been fetched
    }
    fetchStates();
  }, [selectedCountry]);
  return (
    <div className="flex  bg-gray-500  justify-center m-3 p-10    ">
      <div className="flex flex-col w-1/2  bg-black bg-opacity-80 rounded-md  ">
        <h1 className=" text-center  text-white  p-2   text-4xl font-bold ">
          Add User
        </h1>
        <NavLink to="/">
          <button className=" rounded-full text-white bg-emerald-700   p-2  ml-5 text-l ">
            Home
          </button>
        </NavLink>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          {errorMessage ? (
            <h1 className="ml-5 font-semibold text-xl text-yellow-600 ">
              Warning : {errorMessage}
            </h1>
          ) : null}
          <div>
            <div className="flex ">
              <input
                className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
                type="text"
                placeholder="First Name"
                ref={firstName}
              />
              <input
                className="m-4 p-2 rounded-lg h-12  w-1/2  text-black  text-xl"
                type="text"
                placeholder="Second Name"
                ref={secondName}
              />
            </div>

            <div className="flex">
              <input
                className="m-4 p-2 rounded-lg h-12 w-1/2  text-black text-xl"
                type="text"
                placeholder="Email"
                ref={email}
              />
              <input
                className="m-4 p-2 rounded-lg h-12  w-1/2    text-black text-xl"
                type="text"
                placeholder="addressLine 1"
                ref={addressLine1}
              />
            </div>

            <div className="flex">
              <input
                className="m-4 p-2 rounded-lg h-12  w-1/2   text-black  text-xl"
                type="text"
                placeholder="addressLine 2"
                ref={addressLine2}
              />
              <input
                className="m-4 p-2 rounded-lg h-12  w-1/2   text-black text-xl"
                type="text"
                placeholder="zip"
                ref={zipCode}
              />
            </div>
            <div></div>

            {/* <input
            className="m-5 p-2 rounded-lg h-12 bg-gray-600  text-white text-xl"
            type="password"
            placeholder="Password"
            ref={password}
          /> */}
            <PhoneInput
              className="m-6 p-4 rounded-lg h-12 bg-gray-300 text-black text-xl"
              defaultCountry={selectedCountry.value}
              placeholder="Phone"
              value={phone.current}
              onChange={handlePhoneChange}
            />

            {countryDataFetched && (
              <Select
                className="m-4 p-2 rounded-lg h-12 text-black text-xl"
                placeholder="Select country"
                options={countriesList}
                value={selectedCountry}
                onChange={setSelectedCountry}
                //isMulti // Enable multi-select
              />
            )}

            {stateDataFetched && (
              <Select
                className="m-4 p-2 rounded-lg h-12  text-black text-xl"
                placeholder="Select state"
                options={states}
                value={selectedState}
                onChange={setSelectedState}
                //isMulti // Enable multi-select
              />
            )}
          </div>

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
