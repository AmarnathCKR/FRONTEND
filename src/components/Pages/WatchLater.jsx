/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnyApi } from "../../api/api";
import { toogleLoading } from "../../store/store";
import { useNavigate } from "react-router-dom";

function WatchLater() {
  const [movies, setMovie] = useState();
  const [trigger, setTrigger]=useState(false);
  const auth = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getAnyApi("movie/list", auth)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trigger]);

  const handleRemove = (id) => {
    dispatch(toogleLoading);
    getAnyApi(`movie/watchlist-remove?movie=${id}`, auth)
        .then((res) => {
          console.log(res);
          setTrigger(!trigger);
          dispatch(toogleLoading);
        })
        .catch((err) => {
          console.log(err);
          dispatch(toogleLoading);
        });
  };

  const list = movies?.map((item) => {
    return (
      <>
        <a
          key={item._id}
          onClick={() =>
            navigate(`/details/:${item._id}`, {
              state: item._id,
              owner: true,
            })
          }
          className="rounded-lg border-4 w-1/2 grid grid-cols-12 shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform"
        >
          <div className="col-span-12 md:col-span-1">
            <button onClick={() => handleRemove(item._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#F44336"
                  d="M21.5 4.5H26.501V43.5H21.5z"
                  transform="rotate(45.001 24 24)"
                ></path>
                <path
                  fill="#F44336"
                  d="M21.5 4.5H26.5V43.501H21.5z"
                  transform="rotate(135.008 24 24)"
                ></path>
              </svg>
            </button>
          </div>

          <div className="col-span-11 xl:-ml-5">
            <p className="text-blue-600 font-semibold">{item.title}</p>
          </div>

          <div className="md:col-start-2 col-span-11 xl:-ml-5">
            <p className="text-sm text-blue-600 font-light">{item.genre}</p>
          </div>
        </a>
      </>
    );
  });
  return (
    <div>
        {!movies && <p className="text-xxl my-16 font-bold">No movies found on watch later</p>}
      <div className=" flex  gap-4 h-screen mt-10 items-start justify-center">
        {list}
      </div>
    </div>
  );
}

export default WatchLater;
