import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextYalli from "./Context/YalliContext.jsx";
createRoot(document.getElementById("root")).render(
  
  <>
    <Provider store={store}>
      <ContextYalli>
      <App />
      </ContextYalli>
    </Provider>
  </>
)
