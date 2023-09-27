import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./contexts/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App(props) {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Alert alert={alert}></Alert>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              {/* Set the default route to Login */}
              <Route
                path="/"
                element={<Navigate to="/login" />} // Redirect to /login
              />
              <Route exact path="/home" element={<Home showalert={showalert} />} />
              <Route exact path="/login" element={<Login showalert={showalert} />} />
              <Route exact path="/signup" element={<Signup showalert={showalert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
