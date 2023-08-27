import { NavbarDefault } from "../Layout/NavbarDefault";
import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AccountRouter from "./AccountRouter";
import Content from "../Pages/Content";
import ManageMovies from "./ManageMovies";
import { useDispatch, useSelector } from "react-redux";
import { getAnyApi } from "../../api/api";
import {
  subscribeToken,
  subscribeUser,
  unsuscribeToken,
  toogleLoading,
} from "../../store/store";

function PagesRoutes() {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const localToken = localStorage.getItem("token");
    
    if (localToken) {
      dispatch(toogleLoading());
      getAnyApi("user/verifytoken", localToken)
        .then((res) => {
          dispatch(subscribeUser(res.data));
          dispatch(subscribeToken(localToken));
          dispatch(toogleLoading());
        })
        .catch((err) => {
          if (err.response.data.data.errors[0].code === "USER_BLOCKED") {
            localStorage.removeItem("token");
            dispatch(unsuscribeToken());
            dispatch(toogleLoading());
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = useSelector((state) => state.token);
  console.log(auth);

  return (
    <>
      <BrowserRouter>
        <NavbarDefault
          toggleLogin={() => {
            setLogin(!login);
          }}
          className="z-0"
        />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="account/*"
            element={
              <AccountRouter
                login={login}
                toggleLogin={() => {
                  setLogin(!login);
                }}
              />
            }
          />

          <Route
            path="manage/*"
            element={
              auth ? (
                <ManageMovies />
              ) : (
                <AccountRouter
                  login={login}
                  toggleLogin={() => {
                    setLogin(!login);
                  }}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PagesRoutes;
