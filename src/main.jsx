import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

var appData = {
  serverUrl: "http://localhost/wordpress/",
  appUrl: "http://localhost:5173/",
}
// var appData = {
//   serverUrl: "https://isspammy.com/",
//   appUrl: "https://isspammy.com/",
// }

window.appData = appData;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App appData={appData} />
  </BrowserRouter>
);
