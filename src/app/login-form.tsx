import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      alert("Invalid email");
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Fake API delay
    setTimeout(() => {
      setLoading(false);
      alert("Login Successfully");
    }, 2000);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-gray-200 p-4 rounded-xl flex flex-col  items-center gap-3 w-96">
        <h1 className="text-2xl font-bold">Login Form</h1>

        <div className=" w-full px-4">
          <h3 className=" font-semibold text-base">Your email</h3>

          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg mt-1 w-full"
          />
        </div>
        <div className=" w-full px-4">
          <h3 className=" mt-2 font-semibold text-base">Password</h3>

          <div className=" relative">
            <input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3  rounded-lg mt-1 w-full"
            />

            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="black"
              className="absolute right-3 top-1/2 -translate-y-1/2 "
              onPress={handleShowPassword}
            />
          </div>
          <div className="w-full text-right mt-2">
            <h6 className="text-sm underline cursor-pointer">
              Forgot Your Password?
            </h6>
          </div>

          <div className="w-full mt-8">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-blue-500 w-full p-3 rounded-lg text-white flex justify-center items-center   transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>

        <h2 className="text-center mt-10">Don't have an account?</h2>

        <div className=" w-full mt-3">
          <button className="   w-full p-3 rounded-lg text-md font-semibold border border-gray-300 bg-white transition-all duration-300  hover:bg-gray-100 hover:scale-105  hover:shadow-lg active:scale-95 ">
            Sign Up
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
