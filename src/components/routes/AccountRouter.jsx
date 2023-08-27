/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnyApi } from "../../api/api";
import {
  subscribeToken,
  subscribeUser,
  unsuscribeToken,
} from "../../store/store";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
import AccountPage from "../Pages/AccountPage";

function AccountRouter(props) {
  const auth = useSelector((state) => state.token);
  console.log(auth)

  return (
    <>
      {auth ? (
        <><AccountPage /></>
      ) : (
        <>
          {props.login ? (
            <LoginModal toggleLogin={props.toggleLogin} />
          ) : (
            <SignUpModal login={props.login} toggleLogin={props.toggleLogin} />
          )}
        </>
      )}
    </>
  );
}

export default AccountRouter;
