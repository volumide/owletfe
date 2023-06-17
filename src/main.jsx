// import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { OwletProvider } from "./context/app-context.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <OwletProvider>
    <App />
    <ToastContainer position="top-center" hideProgressBar autoClose={3000} />
  </OwletProvider>
  // <React.StrictMode>
  // </React.StrictMode>,
)
