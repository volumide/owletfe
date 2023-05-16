// import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { OwletProvider } from "./context/app-context.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <OwletProvider>
    <App />
  </OwletProvider>
  // <React.StrictMode>
  // </React.StrictMode>,
)
