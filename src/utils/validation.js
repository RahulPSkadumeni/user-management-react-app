export const checkValidData = (
  email,
  // password,
  zip,
  address,
  address2
) => {
  let isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  //let isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  let isZipValid = /^\d{6}$/.test(zip);

  let isAddressLine1 = /^[a-zA-Z' -]+$/.test(address);

  let isAddressLine2 = /^[a-zA-Z' -]+$/.test(address2);
  let isPhoneValid;
  if (!isAddressLine1) {
    return "Enter valid address";
  }
  if (!isAddressLine2) {
    return "Enter valid address";
  }
  if (!isEmailValid) {
    return "Email id is not valid";
  }
  // if (!isPasswordValid) {
  //   return "Password is not valid";
  // }
  if (!isZipValid) {
    return "Enter valid zip code";
  }
  if (isPhoneValid === "") {
    return "Enter valid phone number";
  }
  return true;
};
