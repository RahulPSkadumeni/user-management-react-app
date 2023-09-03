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
    <div className="w-full p-5 ">
      <div className=" flex flex-col  items-center text-6xl font-bold mt-5 ">
        User List
      </div>

      <button
        className=" rounded-full w-36  m-4  p-2 text-white bg-blue-600 font-bold text-2xl"
        onClick={addUser}
      >
        Add User
      </button>
      <table className="mt-5 w-full p-5  border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-2 py-1 border border-gray-300">#</th>{" "}
            {/* Row number column */}
            <th className="px-2 py-1 border border-gray-300">First Name</th>
            <th className="px-2 py-1 border border-gray-300">Second Name</th>
            <th className="px-2 py-1 border border-gray-300">Email</th>
            <th className="px-2 py-1 border border-gray-300">Address Line 1</th>
            <th className="px-2 py-1 border border-gray-300">Address Line 2</th>
            <th className="px-2 py-1 border border-gray-300">Phone</th>
            <th className="px-2 py-1 border border-gray-300">State</th>
            <th className="px-2 py-1 border border-gray-300">Country</th>
            <th className="px-2 py-1 border border-gray-300">Zip</th>
            <th className="px-2 py-1 border border-gray-300">Actions</th>{" "}
            {/* Assuming these are action buttons */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr
              key={user.id}
              className={`bg-${
                index % 2 === 0 ? "white" : "gray-100"
              } text-gray-800`}
            >
              <td className="px-2 py-1 border border-gray-300">{index + 1}</td>{" "}
              {/* Row number */}
              <td className="px-2 py-1 border border-gray-300">
                {user.firstName}
              </td>
              <td className="px-2 py-1 border border-gray-300">
                {user.secondName}
              </td>
              <td className="px-2 py-1 border border-gray-300">{user.email}</td>
              <td className="px-2 py-1 border border-gray-300">
                {user.addressLine1}
              </td>
              <td className="px-2 py-1 border border-gray-300">
                {user.addressLine2}
              </td>
              <td className="px-2 py-1 border border-gray-300">{user.phone}</td>
              <td className="px-2 py-1 border border-gray-300">
                {user.state.label}
              </td>
              <td className="px-2 py-1 border border-gray-300">
                {user.country.label}
              </td>
              <td className="px-2 py-1 border border-gray-300">
                {user.zipCode}
              </td>
              <td className="px-2 py-1 border border-gray-300">
                <button
                  className="rounded-full m-3  p-2 pl-3 pr-3 bg-green-600 text-white font-bold text-xl hover:bg-green-700"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="rounded-full m-3 p-2 pl-3 pr-3 bg-red-600 text-white font-bold text-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
