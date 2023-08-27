import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { unsuscribeToken } from "../../store/store";

function AccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(unsuscribeToken());
    navigate("/");
  };

  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="flex h-96 items-center justify-center">
        <div className="rounded-lg border-2  border-indigo-500 bg-transparent p-4 md:p-10 text-center shadow-lg dark:bg-gray-800">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-person-fill text-white dark:text-indigo-300"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
            <figcaption className="sr-only">
              {user.name}, {user.email}
            </figcaption>
          </figure>
          <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {user.name}
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">{user.email}</p>
          <div className="flex items-center justify-center">
            <a
              onClick={() => {
                navigate("/");
              }}
              className="rounded-full cursor-pointer bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
            >
              Home
            </a>
            <a
              onClick={handleLogout}
              className="ml-4 cursor-pointer rounded-full text-red-800 bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
