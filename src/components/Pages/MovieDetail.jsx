import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAnyApi, getWithoutAuth } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { toogleLoading } from "../../store/store";

import Swal from "sweetalert2";
import RatingStars1 from "../Layout/RatingStars1";

const MySwal = Swal;

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [owned, setOwn] = useState(false);
  const [average, setAverage] = useState(0);
  const [voted, setVote] = useState(false);
  const [trigger,setTrigger] = useState(false);
  const ratingRef = useRef(0);
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
          setMovie(res.data.movie);
          if (res.data.rating.length === 0) {
            setAverage(0);
          } else {
            const sumOfRatings = res.data.rating.reduce(
              (sum, rating) => sum + parseFloat(rating.rating),
              0
            );

            // Calculate the average rating
            const averageRating = sumOfRatings / res.data.rating.length;
            setAverage(Math.floor(averageRating));
          }
          setVote(false);
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
          if (res.data.voted) setVote(true);
          if (res.data.rating.length === 0) {
            setAverage(0);
          } else {
            const sumOfRatings = res.data.rating.reduce(
              (sum, rating) => sum + parseFloat(rating.rating),
              0
            );

            // Calculate the average rating
            const averageRating = sumOfRatings / res.data.rating.length;
            setAverage(Math.floor(averageRating));
          }
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
  }, [trigger]);

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
      } else {
        getAnyApi(`movie/watchlist?movie=${location.state}`, auth)
          .then((res) => {
            console.log(res);
            setOwn(true);
            dispatch(toogleLoading);
            setTrigger(!trigger);
          })
          .catch((err) => {
            console.log(err);
            dispatch(toogleLoading);
            setTrigger(!trigger);
          });
      }
    }
  };

  

  const handleSubmit = (id) => {
    // Execute your function here
    console.log("Function executed!");
    const rating = document.getElementById("ratebar").value;
    getAnyApi(`movie/rating?movie=${id}&rating=${rating}`, auth)
      .then((res) => {
        console.log(res.data);
        setTrigger(!trigger);
        MySwal.fire({
          title: "You have rated this movie",
          text: `You have rated this movie ${ratingRef.current} stars.`,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setTrigger(!trigger);
      });
  };

  const handleClick = (id) => {
    if (!auth) {
      navigate("/account");
      return MySwal.fire({
        title: "Operation failed",
        text: `You must login 1st to rate.`,
        icon: "error",
      });
    }
    if (!voted) {
      MySwal.fire({
        title: "Rate this product",
        html:  '<input type="range" min="0" max="5"step="0.5"  id="ratebar" />',
        showCancelButton: true,
        confirmButtonText: "Submit",
        preConfirm: () => handleSubmit(id),
      });
    } else {
      MySwal.fire({
        title: "Operation failed",
        text: `You have already rated`,
        icon: "error",
      });
    }
  };

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
                  onClick={() => handleClick(movie?._id)}
                  className="mx-4 px-4 py-3 cursor-pointer bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                >
                  Rate Movie
                </a>
              </div>
              <p className="dark:textwhite flex">
                <p className="mx-5 p-5">Rating</p>{" "}
                <RatingStars1 rating={average} spacing="spacing-x-1" />
                <p className="mx-2 pt-5">({average})</p>
              </p>
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
