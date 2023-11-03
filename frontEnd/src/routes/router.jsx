import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/home/Home";
import About from "../pages/about/About";
import SignIn from "../pages/AuthControll/SignIn";
import SignUp from "../pages/AuthControll/SignUp";
import PrivateRoute from "./PrivateRoute";
import AddGallery from "../pages/photoGallery/AddGallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/addgallery",
        element: (
          <PrivateRoute>
            <AddGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
