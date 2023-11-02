import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { signInSuccess, signInFailure } from "../../redux/authSlice";
import app from "./firebase";

const OAuth = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const url = `http://localhost:3000/api/auth/google`;
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const data = await axios.post(url, {
        name: result.user?.displayName || "annonymous",
        email: result.user.email,
        photo: result.user?.photoURL,
      });
      dispatch(signInSuccess(data));
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(signInFailure(error?.response?.data));
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="btn btn-outline btn-secondary"
    >
      Connect with Google
    </button>
  );
};

export default OAuth;
