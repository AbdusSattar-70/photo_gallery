import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/signup.jpg";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const baseUrl = "http://localhost:3000";
  const [formData, setFormData] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [validatError, setValidatError] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkValidate = async (formData) => {
      const url = `${baseUrl}/api/auth/liveValidate`;
      if (formData) {
        try {
          await axios.post(url, formData);
          setValidatError(null);
        } catch (err) {
          setValidatError(err.response.data.errors);
        }
      }
    };
    if (Object.keys(formData).length > 0) {
      const delayDebounceFn = setTimeout(() => {
        checkValidate(formData);
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [formData, setValidatError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${baseUrl}/api/auth/signup`;
    try {
      const res = await axios.post(url, formData);
      setValidatError(null);
      setError(null);
      navigate("/sign-in");
      return res;
    } catch (err) {
      setValidatError(err.response.data.errors);
      setError(err.response.data);
    }
  };

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

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content gap-[8rem] flex-col-reverse lg:flex-row">
        <div className="mr-15">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-3xl text-center mt-2 font-bold">Sign Up now!</h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <input
                type="text"
                name="userName"
                value={formData.userName || ""}
                onChange={handleChange}
                placeholder="What's Your Name"
                className="input input-bordered"
                required
              />
              {validatError && (
                <div className="text-red-600">
                  {validatError?.userName?.msg}
                </div>
              )}
            </div>
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
              {validatError && (
                <div className="text-red-600">{validatError?.email?.msg}</div>
              )}
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
              {validatError && (
                <div className="text-red-600">
                  {validatError?.password?.msg}
                </div>
              )}
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
                disabled={error || validatError}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center text-bold my-4">
            Already have an Account?{" "}
            <Link to="/sign-in" className="text-orange-500 text-bold text-1xl">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
