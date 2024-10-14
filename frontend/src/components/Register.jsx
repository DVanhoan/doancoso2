import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authActions"; 
import { LoginLogo } from "../assets";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        setErrMsg("");
        navigate("/login");
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Form đăng ký */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <img src={LoginLogo} alt="Logo" className="mx-auto mb-4 w-20 h-20" />
            <h1 className="text-3xl font-bold text-gray-800">Create your free jobseeker account</h1>
            <p className="text-gray-600">Register with basic information, complete your profile and start applying for jobs!</p>
          </div>

          {errMsg && <p className="text-red-500 text-sm mb-4">{errMsg}</p>}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              type="text"
              register={register("fullName", { required: "Full Name is required!" })}
              error={errors.fullName?.message}
            />

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

            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              type="password"
              register={register("confirmPassword", {
                validate: (value) => value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
            />

            <CustomButton
              type="submit"
              containerStyles="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              title="Register"
            />
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={() => navigate("/login")}
            >
              Login now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
