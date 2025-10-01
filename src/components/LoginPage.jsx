import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state for toggle
  const [rememberMe, setRememberMe] = useState(false);  
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();

  
    if (username !== "emilys") {
      return setError("Username must be 'emilys'");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      setLoading(true)

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data));
      } 
      navigate("/home", { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#FFFFFF]">
      <div className="flex gap-12 px-4 max-w-4xl w-full">
        {" "}
        {/* Increased max width */}
        {/* Illustration */}
        <div className="hidden md:flex items-center">
          <img
            src="/home.jpg"
            alt="Login Illustration"
            className="w-[300px] h-[300.4px] rounded-xl object-cover"
          />
        </div>
        {/* Login Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col flex-1 my-[2rem]">
          {" "}
          {/* flex-1 for full width */}
          <h2 className="text-2xl font-[500] mb-6  text-[#1C1B1F]">
            Welcome to <br />
            <span className="text-4xl font-[900] text-[#6358DC]">
              Unstop
            </span>{" "}
          </h2>
          {/* Social Buttons */}
          <button className="w-full py-3 rounded-md shadow-md mb-3 flex items-center   justify-center gap-2 text-[#1C1B1F] font-medium hover:bg-gray-50 transition">
            {/* Google icon */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.76222 18.7123L7.85719 22.0909L4.54931 22.1609C3.56073 20.3273 3 18.2295 3 16.0001C3 13.8444 3.52427 11.8115 4.45358 10.0215H4.45429L7.39924 10.5614L8.6893 13.4887C8.41929 14.2758 8.27213 15.1209 8.27213 16.0001C8.27223 16.9544 8.44509 17.8688 8.76222 18.7123Z"
                fill="#FBBB00"
              />
              <path
                d="M28.7729 13.5718C28.9222 14.3582 29 15.1703 29 16.0004C29 16.9311 28.9022 17.839 28.7157 18.7147C28.0829 21.6947 26.4293 24.2969 24.1386 26.1384L24.1378 26.1377L20.4285 25.9484L19.9036 22.6712C21.4236 21.7798 22.6114 20.3847 23.2372 18.7147H16.2856V13.5718H23.3386H28.7729Z"
                fill="#518EF8"
              />
              <path
                d="M24.1376 26.1375L24.1384 26.1382C21.9105 27.9289 19.0804 29.0004 15.9997 29.0004C11.0489 29.0004 6.74459 26.2332 4.54883 22.161L8.76174 18.7124C9.8596 21.6424 12.6861 23.7282 15.9997 23.7282C17.424 23.7282 18.7583 23.3432 19.9033 22.671L24.1376 26.1375Z"
                fill="#28B446"
              />
              <path
                d="M24.2982 5.99288L20.0867 9.44077C18.9017 8.70007 17.5009 8.27218 16.0002 8.27218C12.6116 8.27218 9.73224 10.4536 8.68938 13.4887L4.45432 10.0215H4.45361C6.61723 5.85003 10.9758 3 16.0002 3C19.1545 3 22.0467 4.1236 24.2982 5.99288Z"
                fill="#F14336"
              />
            </svg>
            Login with Google
          </button>
          <button className="w-full py-3 rounded-md shadow-md mb-4 flex items-center justify-center  gap-2 text-[#1C1B1F] font-medium hover:bg-gray-50 transition">
            <svg
              width="12"
              height="26"
              viewBox="0 0 14 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.444 4.64917H14V0.197167C13.559 0.1365 12.0425 0 10.2763 0C2.18965 0 4.3898 9.15833 4.06783 10.5H0V15.477H4.06666V28H9.05258V15.4782H12.9548L13.5742 10.5012H9.05141C9.27073 7.2065 8.16365 4.64917 11.444 4.64917Z"
                fill="#3B5999"
              />
            </svg>
            Login with Facebook
          </button>
          <div className="flex items-center mb-2">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <form onSubmit={handleLogin} className="space-y-2">
            <div className="flex items-center bg-[#f5f5f5] rounded-xl px-6 py-2 gap-7">
              <span className="text-xl text-gray-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </span>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm">Username</label>
                <input
                  type="text"
                  placeholder="username"
                  className="w-full bg-transparent font-semibold text-md outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center bg-[#f5f5f5] rounded-xl px-6 py-2 gap-7">
              <span className="text-2xl text-gray-700">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </span>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="username@gmail.com"
                  className="w-full bg-transparent font-semibold text-md outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex items-center bg-[#f5f5f5] rounded-xl px-6 py-2 gap-7">
              <span className="text-2xl text-gray-700">
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9C6.83333 9 7.54167 8.70833 8.125 8.125C8.70833 7.54167 9 6.83333 9 6C9 5.16667 8.70833 4.45833 8.125 3.875C7.54167 3.29167 6.83333 3 6 3C5.16667 3 4.45833 3.29167 3.875 3.875C3.29167 4.45833 3 5.16667 3 6C3 6.83333 3.29167 7.54167 3.875 8.125C4.45833 8.70833 5.16667 9 6 9ZM6 12C4.33333 12 2.91667 11.4167 1.75 10.25C0.583333 9.08333 0 7.66667 0 6C0 4.33333 0.583333 2.91667 1.75 1.75C2.91667 0.583333 4.33333 0 6 0C7.35 0 8.52917 0.383333 9.5375 1.15C10.5458 1.91667 11.25 2.86667 11.65 4H20.025L22 5.975L18.5 9.975L16 8L14 10L12 8H11.65C11.2333 9.2 10.5083 10.1667 9.475 10.9C8.44167 11.6333 7.28333 12 6 12Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </span>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm">Password</label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="w-full bg-transparent font-semibold text-md outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                
                  <button
                    type="button"
                    className="ml-2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="14"
                        viewBox="0 0 22 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15Z"
                          fill="#1C1B1F"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="14"
                        viewBox="0 0 22 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15Z"
                          fill="#1C1B1F"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-[#6358DC]  hover:underline"
              >
                Forgot Password?
              </a>
            </div>

             <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-1 rounded-md transition text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6358DC] hover:bg-purple-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-[#6358DC]  hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
