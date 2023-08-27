/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

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
