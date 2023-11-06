import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/sign-in" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
