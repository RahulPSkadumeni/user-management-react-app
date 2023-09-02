import { createSlice } from "@reduxjs/toolkit";
const user = [
  {
    id: 1,
    firstName: "John",
    secondName: "Doe",
    email: "john@example.com",
    addressLine1: "plathottathil",
    addressLine2: "kadumeni",
    phone: +919744187790,
    state: { value: "Assam", label: "Assam" },
    country: { value: "IN", label: "India" },
    zipCode: 670511,
    // ... other user data
  },
  {
    id: 2,
    firstName: "Rahul",
    secondName: "Doe",
    email: "john@example.com",
    addressLine1: "plathottathil",
    addressLine2: "kadumeni",
    phone: +919744187790,
    state: { value: "Assam", label: "Assam" },
    country: { value: "IN", label: "India" },
    zipCode: 670511,
    // ... other user data
  },
  {
    id: 3,
    firstName: "Rahul",
    secondName: "PS",
    email: "john@example.com",
    addressLine1: "plathottathil",
    addressLine2: "kadumeni",
    phone: +919744187790,
    state: { value: "Kerala", label: "Kerala" },
    country: { value: "IN", label: "India" },
    zipCode: 670511,
    // ... other user data
  },
];
const userSlice = createSlice({
  name: "user",
  initialState: user,

  reducers: {
    addUser: (state, action) => {
      console.log("adding user");
      return [...state, action.payload];
    },
    updateUser: (state, action) => {
      console.log("update");
      const {
        id,
        firstName,
        secondName,
        email,
        addressLine1,
        addressLine2,
        zipCode,
        phone,
        country,
        state: userState,
      } = action.payload;

      console.log(id, firstName, email);
      return state.map((user) =>
        user.id === id
          ? {
              ...user,
              firstName: firstName,
              secondName: secondName,
              phone: phone,
              country: country,
              state: state,
              email: email,
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              zipCode: zipCode,
            }
          : user
      );
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});
export default userSlice.reducer;
export const { addUser, updateUser, deleteUser } = userSlice.actions;
