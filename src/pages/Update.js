import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { checkValidData } from "../utils/validation";
import { updateUser } from "../utils/userSlice";
import { fetchCountries, fetchStatesByCountry } from "../utils/stateList";
import Select from "react-select";

import PhoneInput from "react-phone-number-input";

const Update = () => {
  const [countriesList, setCountriesList] = useState([]);
  const users = useSelector((state) => state.user);
  const params = useParams();
  const id = parseInt(params.id);
  const existingUser = users.filter((f) => f.id === id);
  console.log(existingUser[0]);
  const [userData, setUserData] = useState(existingUser[0]);
  const [selectedCountry, setSelectedCountry] = useState(userData.country);
  console.log("selectedCountry", selectedCountry);
  const [selectedState, setSelectedState] = useState(userData.state);
  console.log("state", selectedState);
  const [phoneValue, setPhoneValue] = useState(userData.phone.toString());
  console.log(phoneValue);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(userData.email);
  const password = useRef(null);
  const [firstName, setFirstName] = useState(userData.firstName);
  const phone = useRef("");
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [secondName, setSecondName] = useState(userData.secondName);
  const [addressLine1, setAddressLine1] = useState(userData.addressLine1);
  const [addressLine2, setAddressLine2] = useState(userData.addressLine2);

  const state = useRef(null);

  const [states, setStates] = useState([]);
  console.log(" statesss", states);

  const [countryDataFetched, setCountryDataFetched] = useState(false);
  const [stateDataFetched, setStateDataFetched] = useState(false);
  const [Token, setToken] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log("handle button click");
    const message = checkValidData(
      email,
      // password.current.value,
      zipCode,
      addressLine1,
      addressLine2,
      phoneValue
    );
    console.log(message);
    setErrorMessage(message);

    if (message === true) {
      const updatedUser = {
        ...userData, // Keep existing user data
        firstName: firstName,
        secondName: secondName,
        email: email,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        zipCode: zipCode,
        phone: phoneValue,
        country: selectedCountry,
        userState: selectedState,
      };
      console.log("updation", updatedUser);
      dispatch(updateUser(updatedUser));
      navigate("/");
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
        const countryData = await fetchCountries();

        setCountriesList(countryData);
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
  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: phoneValue,
    }));
  }, [phoneValue]);
  return (
    <div className="flex bg-gray-500  justify-center mt-3 ">
      <div className="flex flex-col w-1/2 bg-black bg-opacity-60 rounded-md m-5 p-5  ">
        <h1 className=" items-center justify-center  text-white  p-2 m-5  text-4xl font-bold ">
          Update User Info
        </h1>
        <NavLink to="/">
          <button className=" rounded-full text-white bg-emerald-700 w-36  p-2 ml-5   text-xl ">
            Home
          </button>
        </NavLink>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          {errorMessage ? (
            <h1 className="ml-5 font-semibold text-xl text-yellow-600 ">
              Warning : {errorMessage}
            </h1>
          ) : null}
          <div className="flex ">
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="First Name"
              // ref={firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="Second Name"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            />
          </div>

          <div className="flex ">
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="address line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>
          <div className="flex ">
            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="address line 2 "
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />

            <input
              className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
              type="text"
              placeholder="zip"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          {userData && (
            <PhoneInput
              className="m-6 p-4 rounded-lg h-12 bg-gray-300 text-black text-xl"
              defaultCountry={selectedCountry.value}
              placeholder="Phone"
              value={""}
              onChange={(newPhoneValue) => setPhoneValue(newPhoneValue)}
            />
          )}
          <div className="flex">
            {selectedCountry && (
              <Select
                className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
                placeholder="Select country"
                options={countriesList}
                value={selectedCountry}
                onChange={setSelectedCountry}
                //isMulti // Enable multi-select
              />
            )}

            {stateDataFetched && (
              <Select
                className="m-4 p-2 rounded-lg h-12 w-1/2  text-black  text-xl"
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

export default Update;
