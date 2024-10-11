import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/users"; 
import { LoginLogo } from "../assets";
import { CustomButton, TextInput } from "../components";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const { loading, error, user } = useSelector((state) => state.user || {});
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then((result) => {
        setErrMsg("");
        const role = result.user.role[0];
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "author") {
          navigate("/author");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Form đăng nhập */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <img src={LoginLogo} alt="Logo" className="mx-auto mb-4 w-20 h-20" />
            <h1 className="text-3xl font-bold text-gray-800">Joblister Login</h1>
            <p className="text-gray-600">Welcome back to Job lister</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              label="Email Address"
              placeholder="email@example.com"
              type="email"
              register={register("email", { required: "Email Address is required!" })}
              error={errors.email?.message}
            />

            <TextInput
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              register={register("password", { required: "Password is required!" })}
              error={errors.password?.message}
            />

            {errMsg && <p className="text-red-500">{errMsg}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-500">
                <input type="checkbox" className="form-checkbox rounded text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-900 text-sm">Forgot password?</a>
            </div>

            <CustomButton
              type="submit"
              containerStyles="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              title="Login"
              disabled={loading}
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

        {/* Phần hình ảnh bên phải */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Mark yourself as Actively Job seeker</h2>
          <p className="text-gray-600 text-sm mt-2 text-center">
            We have enabled this feature targeting superheroes who lost their jobs during this crisis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
