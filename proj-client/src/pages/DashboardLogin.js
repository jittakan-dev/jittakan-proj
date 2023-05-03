import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardLogin = (props) => {
  const navigatetoDashboard = useNavigate();
  const [login, setLogin] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "/adminonwarpdriveaheadtomultiverse/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login),
          credentials: "include",
        }
      );
      if (response.ok) {
        const result = await response.text();
        console.log(result);
        props.onLogin(true);
        navigatetoDashboard("/adminonwarpdriveaheadtomultiverse/dashboard");
      } else {
        throw new Error(
          `RESPONSE : ${response.status} ${response.statusText} //`
        );
      }
    } catch (error) {
      console.error("another error : " + error + " XXXX ");
    }
  };

  return (
    <div className="w-full h-full justify-center items-center">
      <div className="w-full p-6 font-bold text-3xl border-b-2 border-slate-500">
        <Link to="/" className={`cursor-pointer`}>
          Home
        </Link>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={login.usernameOrEmail}
              onChange={handleChange}
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="p-3 mt-4 bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;
