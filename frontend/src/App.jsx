import React from "react";
import IndexPage from "./Pages/IndexPage";
import InfoPage from "./Pages/InfoPage";
import axios from "axios";
import { Route,Routes } from "react-router-dom";

function App() {
return(
  <Routes>
    <Route path={"/"} element={<IndexPage/>}/> 
    <Route path={"/info"} element={<InfoPage/>}/>
    </Routes>
)
}

export default App;