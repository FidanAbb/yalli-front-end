import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
     
      <App />
    </Provider>
  </>
);
