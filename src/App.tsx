import * as styles from "./App.module.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./navigation/NavBar/NavBar";
import Todos from "./pages/Todos/Todos";
import TodoDetails from "./pages/TodoDetails/TodoDetails";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<TodoDetails />} />
      </Routes>
    </>
  );
}

export default App;
