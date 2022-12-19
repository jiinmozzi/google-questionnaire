import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, { useEffect } from 'react';
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Response from "./pages/Response";

import "./styles/reset.scss";
import { useDispatch } from "react-redux";
import { createInitialQuestion } from "./store/slices/questionnaireSlice";

function App() {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(createInitialQuestion());
    }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/response" element={<Response />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
