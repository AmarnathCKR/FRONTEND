/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router';
import Joi from 'joi';
import { PostAnyApi } from '../../api/api';
import { useDispatch } from 'react-redux';
import { subscribeToken, toogleLoading } from '../../store/store';

const schema = Joi.object({
  
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

function LoginModal(props) {
  const [input, setInput] = React.useState({});
  const [error,setError] = React.useState(null);
  const [hide, setHide] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    dispatch(toogleLoading());
    event.preventDefault();

    const { error } = schema.validate({  email : input.email ?input.email : "n", password: input.password ? input.password : ""});

    if (error) {
      if(error.details[0].message.includes("email")){
        dispatch(toogleLoading());
         setError({...error, email : error.details[0].message})
      }
     if(error.details[0].message.includes("password")){
      dispatch(toogleLoading());
         setError({...error, password : error.details[0].message})
      }
      dispatch(toogleLoading());
      console.log(error.details[0].message)
    } else {
      setError('');
      // Submit form data
      PostAnyApi("user/login", input).then((res)=>{
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
  
  return (
    <>
      <div className="z-[999] modal-local p-4">
        <div className="modal-local-content rounded">
          <div className="modal-local-header">
            <h4 className="modal-local-title text-center font-bold text-xl">
              Login now
            </h4>
          </div>
          <div className="modal-local-body ng-white dark:bg-blue-gray-700 text-black dark:text-white text-center">
            <h2 className="py-3 text-lg font-medium">
            {error?.main ? error?.main : "Please Enter your Details"}
            </h2>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-4 mx-2">
              <input
                className="w-full border-none rounded py-1 bg-neutral-100 text-gray-700 focus:outline-none items-center"
                type="text"
                value={input.email}
                placeholder="Email"
                onChange={(event) => {
                  setInput({ ...input, email: event.target.value });
                }}
              />
              {error?.email &&<p className="text-start text-sm text-red-900">{error.email}</p>}
            </div>
            <div className="flex my-4 mx-2">
              <input
                className="w-full border-none rounded py-1 bg-neutral-100 text-gray-700 focus:outline-none items-center"
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
            {error?.password &&<p className="text-start text-sm text-red-900">{error.password}</p>}
            <div className="flex flex-col my-4 mx-2 justify-center">
              <button
                type="submit"
                className="border bg-black text-white p-2"
              >
                Login
              </button>
              <a>Create an accont? <span className="text-blue-gray-200 cursor-pointer" onClick={props.toggleLogin}>click here</span></a>
            </div>
            </form>
          </div>
          <div className="modal-local-footer">
            <button onClick={()=>{navigate("/")}} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default LoginModal