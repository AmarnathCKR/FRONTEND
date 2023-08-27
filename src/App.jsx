/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { toogleLoading } from "./store/store";
import PagesRoutes from "./components/routes/PagesRoutes";


function App() {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const handleLoading = ()=>{
    dispatch(toogleLoading())
  }
  
  return (
    <>
      {loading && <div className="z-50 loader-local bg-secondary"><ClipLoader className="bg-white" /></div>}
      <PagesRoutes />
      
    </>
  );
}

export default App;
