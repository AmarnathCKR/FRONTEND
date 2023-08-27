/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router";
import Joi from "joi";
import { PostAnyApi } from "../../api/api";
import { useDispatch } from "react-redux";
import { subscribeToken, toogleLoading } from "../../store/store";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

function SignUpModal(props) {
  const [input, setInput] = React.useState({});
  const [error, setError] = React.useState(null);
  const [hide, setHide] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(toogleLoading());

    const { error } = schema.validate({
      name: input.name ? input.name : "d",
      email: input.email ? input.email : "n",
      password: input.password ? input.password : "",
    });

    if (error) {
      if (error.details[0].message.includes("email")) {
        setError({ ...error, email: error.details[0].message });
        dispatch(toogleLoading());
      }
      if (error.details[0].message.includes("name")) {
        setError({ ...error, name: error.details[0].message });
        dispatch(toogleLoading());
      }
      if (error.details[0].message.includes("password")) {
        setError({ ...error, password: error.details[0].message });
        dispatch(toogleLoading());
      }

      console.log(error.details[0].message);
      dispatch(toogleLoading());
    } else {
      setError("");
      PostAnyApi("user/signup", input).then((res)=>{
        console.log(res.data.token);
        localStorage.setItem("token",res.data.token);
        dispatch(subscribeToken(res.data.token));
        navigate("/");
        dispatch(toogleLoading());
      })
      .catch((err)=>{
        console.log(err);
        setError({...error,main : err.response.data.error})
        dispatch(toogleLoading());
      })
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <div className="z-[999] modal-local p-4">
        <div className="modal-local-content rounded">
          <div className="modal-local-header">
            <h4 className="modal-local-title text-center font-bold text-xl">
              Register
            </h4>
          </div>
          <div className="modal-local-body ng-white dark:bg-blue-gray-700 text-black dark:text-white text-center">
            <h2 className={error?.main ? "text-red-900 py-3 text-lg font-medium" : "text-black py-3 text-lg font-medium"}>
              {error?.main ? error?.main : "Please Enter your Details"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col my-4 mx-2">
                <input
                  className={`w-full ${
                    error?.name ? "border-red" : "border-none"
                  } rounded py-1 bg-neutral-100 text-gray-700 focus:outline-none items-center`}
                  type="text"
                  placeholder="Full Name"
                  value={input.name}
                  onChange={(event) => {
                    setInput({ ...input, name: event.target.value });
                  }}
                />
                {error?.name && (
                  <p className="text-start text-sm text-red-900">
                    {error.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col my-4 mx-2">
                <input
                  className={`w-full ${
                    error?.email ? "border-red" : "border-none"
                  } rounded py-1 bg-neutral-100 text-gray-700 focus:outline-none items-center`}
                  type="text"
                  value={input.email}
                  placeholder="Email"
                  onChange={(event) => {
                    setInput({ ...input, email: event.target.value });
                  }}
                />
                {error?.email && (
                  <p className="text-start text-sm text-red-900">
                    {error.email}
                  </p>
                )}
              </div>
              <div className="flex my-4 mx-2">
                <input
                  className={`w-full ${
                    error?.password ? "border-red" : "border-none"
                  } rounded py-1 bg-neutral-100 text-gray-700 focus:outline-none items-center`}
                  type={hide ? "text" : "password"}
                  placeholder="Password"
                  value={input.password}
                  onChange={(event) => {
                    setInput({ ...input, password: event.target.value });
                  }}
                />

                <label
                  className="cursor-pointer"
                  onClick={() => {
                    setHide(!hide);
                  }}
                >
                  {hide ? "Hide" : "show"}
                </label>
              </div>
              {error?.password && (
                <p className="text-start text-sm text-red-900">
                  {error.password}
                </p>
              )}
              <div className="flex flex-col my-4 mx-2 justify-center">
                <button
                  type="submit"
                  className="border bg-black text-white p-2"
                >
                  Register
                </button>
              </div>
            </form>
            <a>
              Already have an account?{" "}
              <span
                className="text-blue-gray-200 cursor-pointer"
                onClick={props.toggleLogin}
              >
                click here
              </span>
            </a>
          </div>

          <div className="modal-local-footer">
            <button onClick={handleClose} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
