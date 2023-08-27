import { NavbarDefault } from "../Layout/NavbarDefault";
import { useState }  from "react";
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import AccountRouter from "./AccountRouter";
import Content from "../Pages/Content";
import ManageMovies from "./ManageMovies";
import { useDispatch, useSelector } from "react-redux";
import { getAnyApi } from "../../api/api";
import { subscribeToken, subscribeUser, unsuscribeToken } from "../../store/store";

function PagesRoutes() {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      getAnyApi("user/verifytoken", localToken)
        .then((res) => {
          dispatch(subscribeUser(res.data));
          dispatch(subscribeToken(localToken));
        })
        .catch((err) => {
          if (err.response.data.data.errors[0].code === "USER_BLOCKED") {
            localStorage.removeItem("token");
            dispatch(unsuscribeToken());
          }
        });
      
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = useSelector((state) => state.token);
  console.log(auth)

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
          <Route
            path="/"
            element={
              <Content />
            }
          />
          <Route path="account/*" element={<AccountRouter login={login} toggleLogin={()=>{setLogin(!login);}} />} />
          
          <Route path="manage/*" element={<ManageMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PagesRoutes;
