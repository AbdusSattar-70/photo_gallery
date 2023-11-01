import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/authSlice";
import img from "../../assets/images/signup.jpg";
import OAuth from "./OAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "password" || name === "confirmPassword") {
        if (updatedData.password !== updatedData.confirmPassword) {
          setPasswordMatchError("Passwords do not match");
        } else {
          setPasswordMatchError("");
        }
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    try {
      dispatch(signInStart());
      e.preventDefault();
      const url = `http://localhost:3000/api/auth/signin`;
      const data = await axios.post(url, formData);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err?.response?.data));
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content gap-[8rem] flex-col-reverse lg:flex-row">
        <div className="mr-15">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-3xl text-center mt-2 font-bold">Sign In now!</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="What's Your Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Enter Your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                placeholder="Confirm Your password"
                className="input input-bordered"
                required
              />
              {passwordMatchError && (
                <div className="text-red-600">{passwordMatchError}</div>
              )}
              {error && <div className="text-red-600">{error?.message}</div>}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={passwordMatchError}
              >
                {loading ? "loading" : " Sign In"}
              </button>
            </div>
            <OAuth />
          </form>
          <p className="text-center text-bold my-4">
            Don&apos;t have an Account?{" "}
            <Link to="/sign-up" className="text-orange-500 text-bold text-1xl">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
