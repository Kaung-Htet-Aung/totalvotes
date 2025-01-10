import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Boy from "./Boy";
import Girl from "./Girl";

const App=()=>{
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Boy/>}/>
              <Route path="/girl" element={<Girl/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;