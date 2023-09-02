import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  // const userData = [
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john@example.com",
  //     addressLine1: "plathottathil",
  //     addressLine2: "kadumeni",
  //     phone: +919744187790,
  //     state: "Kerala",
  //     country: "India",
  //     zip: 670511,
  //     // ... other user data
  //   },
  //   {
  //     firstName: "Rahul",
  //     lastName: "Doe",
  //     email: "john@example.com",
  //     addressLine1: "plathottathil",
  //     addressLine2: "kadumeni",
  //     phone: +919744187790,
  //     state: "Kerala",
  //     country: "India",
  //     zip: 670511,
  //     // ... other user data
  //   },
  //   {
  //     firstName: "Rahul",
  //     lastName: "PS",
  //     email: "john@example.com",
  //     addressLine1: "plathottathil",
  //     addressLine2: "kadumeni",
  //     phone: +919744187790,
  //     state: "Kerala",
  //     country: "India",
  //     zip: 670511,
  //     // ... other user data
  //   },
  //   // Add more user objects here
  // ];
  const userData = useSelector((state) => state.user);
  console.log("UserData", userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log("index", id);
    dispatch(deleteUser(id));
  };
  const addUser = () => {
    navigate("/register");
  };
  useEffect(() => {}, []);
  const handleEdit = (id) => {
    console.log("edit", id);
    navigate(`/update/${id}`);
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center text-6xl font-bold mt-5 ">
        User List
      </div>

      <button
        className=" rounded-full w-36  m-4  p-2 text-white bg-blue-600 font-bold text-2xl"
        onClick={addUser}
      >
        Add User
      </button>

      <table className="mt-5">
        <thead>
          <tr className="border-2 text-xl border-black m-2 p-2">
            <th>First Name</th>
            <th>Second Name</th>
            <th>Email</th>
            <th>address Line 1</th>
            <th>address Line 2</th>
            <th>Phone</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip</th>
            {/* Add more table headers for other user properties */}
          </tr>
        </thead>
        <tbody className="bg-slate-600 h-14 border-white">
          {userData.map((user, index) => (
            <tr
              key={user.id}
              className="text-white border-white justify-center"
            >
              <td className=" items-center">{user.firstName}</td>
              <td>{user.secondName}</td>
              <td>{user.email}</td>
              <td>{user.addressLine1}</td>
              <td>{user.addressLine2}</td>
              <td>{user.phone}</td>
              <td>{user.state.label}</td>
              <td>{user.country.label}</td>
              <td>{user.zipCode}</td>
              <td className="flex flex-col ">
                <button
                  className=" rounded-full  m-1  p-1 bg-green-600 font-bold text-2xl"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className=" rounded-full  m-1  p-1 bg-red-600 font-bold text-2xl"
                >
                  Delete
                </button>
              </td>

              {/* Add more table cells for other user properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
