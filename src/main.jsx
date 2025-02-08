import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

var appData = {
  serverUrl: "http://localhost/wordpress/",
  appUrl: "http://localhost:5173/",
}

window.appData = appData;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App appData={appData} />
  </BrowserRouter>
);
