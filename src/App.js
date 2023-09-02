import logo from "./logo.svg";
import "./App.css";
import RegistrationForm from "./pages/RegistrationForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

    children: [],
  },
  {
    path: "/register",
    element: <RegistrationForm />,

    children: [],
  },
  {
    path: "/update/:id",
    element: <Update />,

    children: [],
  },
]);

function App() {
  return (
    <div className="App flex flex-col   bg-emerald-100 h-screen ">
      {/* // <RegistrationForm /> */}
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
