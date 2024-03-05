import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Smart from "./Inactive";
import ViewUser from "./ViewUser";
import Users from "./Users";
import User from "./User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Smart />} />
        <Route path="/user/:userId" element={<ViewUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/active/:user_id" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
