import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Response from "./pages/Response";

import "./styles/reset.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/repsonse" element={<Response />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
