import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { CustomButton, TextInput } from "../components";
import GoogleIcon from "../assets/google-icon.svg";
import { LoginLogo } from "../assets";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {

    try {
      const response = await login({ ...data });

      const token = response.data.access_token;
      
      if (token) {
        toast.success("Đăng nhập thành công");
        const role = localStorage.getItem('role');
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "author") {
          navigate("/author/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Tài khoản như được đăng ký hoặc mật khẩu");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to JobLister
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-purple-600">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-600">
              Privacy Policy
            </a>
            .
          </p>

          <button className="w-full border border-red-400 text-red-500 py-2 flex items-center justify-center rounded-md mb-4">
            <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Sign In with Google
          </button>

          <div className="flex items-center justify-center my-4">
            <span className="border-b w-full"></span>
            <span className="px-3 text-gray-500">or</span>
            <span className="border-b w-full"></span>
          </div>


          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              label="Email Address"
              placeholder="email@example.com"
              type="email"
              register={register("email", {
                required: "Email Address is required!",
              })}         
            />

            <TextInput
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              register={register("password", {
                required: "Password is required!",
              })}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-500">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-indigo-600"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-900 text-sm"
              >
                Forgot password?
              </a>
            </div>

            <CustomButton
              type="submit"
              containerStyles="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              title="Login"
            />
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={() => navigate("/register")}
            >
              Register now
            </span>
          </p>
        </div>

        <div
          className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${LoginLogo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-2xl font-semibold text-white">
            Mark yourself as Actively Job Seeker
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
