import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Smart from './Inactive';
import ViewUser from './ViewUser';

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Smart />} />
              <Route path="/user/:userId" element={<ViewUser />} />
          </Routes>
      </Router>
  );
}

export default App;
