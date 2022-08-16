import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login"
import Profile from "./components/Profile";
import AuthService from "./services/auth.service"
import Course from "./components/Course";
import PostCourse from "./components/PostCourse";
import Enroll from "./components/Enroll";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/course" element={<Course currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/postCourse" element={<PostCourse currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        <Route path="/enroll" element={<Enroll currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
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
