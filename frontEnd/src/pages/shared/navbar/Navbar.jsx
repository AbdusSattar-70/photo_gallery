import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:3000/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };
  const navItems = (
    <>
      <li>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <Link to="/gallery" className="justify-between">
          Add Gallery
          <span className="badge">New</span>
        </Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100 mb-4 shadow-2xl">
      <nav className="navbar-start max-w-6xl mx-auto px-8">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={logo} alt="profile photo" />
            </div>
          </label>
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </nav>
      <nav className="navbar-end">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={currentUser?.data?.avatar} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-700 cursor-pointer"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="navbar-center lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/sign-up"> Sign Up</Link>
              </li>
              <li>
                <Link to="/sign-in"> Sign In</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
