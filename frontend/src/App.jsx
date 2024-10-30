import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Outlet />
    </>
  );
}

export default App;
