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

  let isAddressLine1 = /^\b[0-9\\\/# ,a-zA-Z]{6,}[ ,]+[0-9\\\/#, a-zA-Z]{1,}$/.test(
    address
  );

  let isAddressLine2 = /^\b[0-9\\\/# ,a-zA-Z]{6,}[ ,]+[0-9\\\/#, a-zA-Z]{1,}$/.test(
    address2
  );

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

  return true;
};

// address sample ={
//   1 Sleepy Boulevard PO, Box 65745
// Suite #100 /98,North St,Snoozepura
// Ave., New Jersey,
// Suite 420 1130 Connect Ave., NW,
// Suite 420 19 / 21 Old Avenue,
// Suite 12, Springfield, VIC 3001
// Suite#100/98 North St Snoozepura
// }
