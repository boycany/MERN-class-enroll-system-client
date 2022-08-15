import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login"

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "2rem", textAlign: "center" }}>
              <h1>There's nothing here!</h1>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
