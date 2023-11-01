import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/signup.jpg";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    e.preventDefault();
    const url = `http://localhost:3000/api/auth/signin`;
    try {
      const res = await axios.post(url, formData);
      setError(null);
      navigate("/");
      return res;
    } catch (err) {
      setError(err.response.data);
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
              <input
                type="submit"
                value="sign in"
                className="btn btn-primary"
              />
            </div>
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
