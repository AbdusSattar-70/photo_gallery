import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <Link to="/about"> About</Link>
      </li>
      <li>
        <Link to="/gallery"> Gallery</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-blue-200 shadow-xl mb-4">
      <div className="navbar-start">
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
        <Link to="/">
          <label className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={logo} />
            </div>
          </label>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-semibold px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2 ml-5">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-24 md:w-auto bg-red-100/10"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={logo} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/sign-up"> Sign Up</Link>
              </li>
              <li>
                <Link to="/sign-in"> Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
