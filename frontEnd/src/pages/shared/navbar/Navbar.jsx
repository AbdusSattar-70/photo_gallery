import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
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
    <header className="navbar bg-base-100 mb-4 shadow-2xl">
      <nav className="navbar-start">
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
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/sign-in"> Sign Out</Link>
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
