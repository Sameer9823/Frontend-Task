import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
       <h2 className="text-2xl font-[500] mb-12 text-[#1C1B1F]">
            Welcome to <br />
            <span className="text-4xl font-[900] text-[#6358DC]">
              Unstop
            </span>{" "}
          </h2>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center mt-[2rem]">
        <img
          src="/ava.jpg"
          alt="profile"
          className="w-30 h-30 rounded-full object-cover mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{user?.username}</h2>
        <p className="text-gray-600">{user?.email || "example@gmail.com"}</p>
        <p className="text-gray-600">{user?.gender || "example@gmail.com"}</p>
        <button
          onClick={handleLogout}
          className="mt-4 w-[50%]  bg-[#6358DC] text-white py-3 rounded-xl hover:bg-[#4d3fe6] transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
      
    </div>
  );
}

export default HomePage;
