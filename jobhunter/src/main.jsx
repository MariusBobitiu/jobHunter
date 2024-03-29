import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import { store, persistor } from "./Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
