import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAnyApi, getWithoutAuth } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { toogleLoading } from "../../store/store";

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [owned, setOwn] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.token);
  console.log("stuff" + auth);
  useEffect(() => {
    if (!auth && location.state) {
        dispatch(toogleLoading);
      getWithoutAuth(`movie/details?movie=${location.state}`)
        .then((res) => {
          console.log(res);
          setMovie(res.data);
          dispatch(toogleLoading);
        })
        .catch((err) => {
          console.log(err);
          dispatch(toogleLoading);
        });
    } else {
        dispatch(toogleLoading);
      getAnyApi(`movie/details/auth?movie=${location.state}`, auth)
        .then((res) => {
            
          console.log(res);
          setMovie(res.data.movie);
          if (res.data.owned) {
              setOwn(true);
            } else {
                setOwn(false);
            }
            dispatch(toogleLoading);
        })
        .catch((err) => {
          console.log(err);
          dispatch(toogleLoading);
        });
    }
  }, []);

  const handleWatch = () => {
    dispatch(toogleLoading);
    if (!auth) {
      navigate("/account");
      dispatch(toogleLoading);
    } else {
      if (owned) {
        getAnyApi(`movie/watchlist-remove?movie=${location.state}`, auth)
        .then((res) => {
          console.log(res);
          setOwn(false);
          dispatch(toogleLoading);
        })
        .catch((err) => {
          console.log(err);
          dispatch(toogleLoading);
        });
      }else{
        getAnyApi(`movie/watchlist?movie=${location.state}`, auth)
        .then((res) => {
          console.log(res);
          setOwn(true);
          dispatch(toogleLoading);
        })
        .catch((err) => {
          console.log(err);
          dispatch(toogleLoading);
        });
      }
      
    }
  };
  const handleRate = () => {};

  return (
    <>
      <div className="w-full">
        <div
          className="flex mt-10 dark:bg-black bg-white"
          style={{ height: "600px" }}
        >
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white md:text-4xl">
                {movie?.title} -{" "}
                <span className="text-indigo-600">{movie?.year}</span>
              </h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                {movie?.genre}
              </p>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                {movie?.plot}
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-500 md:text-base">
                Directed By {movie?.director}
              </p>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                {movie?.runtime}min, {movie?.language}, {movie?.country}
              </p>

              <div className="flex justify-center lg:justify-start mt-6">
                <a
                  onClick={handleWatch}
                  className="px-4 py-3 cursor-pointer bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                >
                  {owned ? "Remove from watchlist" : "Add to watchlist"}
                </a>
                <a
                  onClick={handleRate}
                  className="mx-4 px-4 py-3 cursor-pointer bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                >
                  Rate Movie
                </a>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2"
            style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
          >
            <div
              className="h-full object-cover"
              style={{ backgroundImage: `url(${movie?.image})` }}
            >
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
