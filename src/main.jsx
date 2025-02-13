import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// var appData = {
// 	serverUrl: "http://localhost/wordpress/",
// 	serverUrl: "https://isspammy.com/",
// 	appUrl: "http://localhost:5173/",
// };
var appData = {
	serverUrl: "https://isspammy.com/",
	appUrl: "https://app.isspammy.com/",
}

window.appData = appData;
console.log(import.meta.env.VITE_APP)
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App appData={appData} />
	</BrowserRouter>
);
