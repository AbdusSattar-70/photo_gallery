import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

// internal import
import { store, persistor } from "./redux/store";
import router from "./routes/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <main>
        <RouterProvider router={router} />
      </main>
    </PersistGate>
  </Provider>
);
