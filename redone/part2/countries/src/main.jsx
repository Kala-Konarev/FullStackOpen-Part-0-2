import { createRoot } from "react-dom/client";
import App from "./App.jsx";
const apiKey = import.meta.env.WEATHER_KEY;
console.log(apiKey);
createRoot(document.getElementById("root")).render(<App />);
