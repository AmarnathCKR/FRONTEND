import Swal from "sweetalert2";
import { postAnyAuth } from "../../api/api";
import { useSelector } from "react-redux";
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  director: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2023).required(),
  actors: Joi.string().required(),
  plot: Joi.string().required(),
  runtime: Joi.number().integer().min(0).max(1000).required(),
  rating: Joi.number().min(0).max(10).required(),
  language: Joi.string().required(),
  country: Joi.string().required(),
});

function ManageMovies() {
  const auth = useSelector((state) => state.token);
  console.log(auth)
  const handleClick = () => {
    Swal.fire({
      title: "Enter your movie recommendation",
      html:
        '<input id="title" class="swal2-input" placeholder="Title">' +
        '<input id="genre" class="swal2-input" placeholder="Genre">' +
        '<input id="director" class="swal2-input" placeholder="Director">' +
        '<input id="year" class="swal2-input" placeholder="Year">' +
        '<input id="actors" class="swal2-input" placeholder="Actors">' +
        '<input id="plot" class="swal2-input" placeholder="Plot">' +
        '<input id="runtime" class="swal2-input" placeholder="Runtime">' +
        '<input id="rating" class="swal2-input" placeholder="Rating">' +
        '<input id="language" class="swal2-input" placeholder="Language">' +
        '<input id="country" class="swal2-input" placeholder="Country">',
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const director = document.getElementById("director").value;
        const year = document.getElementById("year").value;
        const actors = document.getElementById("actors").value;
        const plot = document.getElementById("plot").value;
        const runtime = document.getElementById("runtime").value;
        const rating = document.getElementById("rating").value;
        const language = document.getElementById("language").value;
        const country = document.getElementById("country").value;
       
        const { error, value } = schema.validate(
          { title, genre, director, year, actors, plot, runtime, rating, language, country },
          { abortEarly: false }
        );
  
        if (error) {
          Swal.showValidationMessage(error.details.map((detail) => detail.message).join('<br>'));
          return false;
        }
  
        return value;
      },
    }).then((result) => {
      if (result.isConfirmed) {

        const data = result.value;
        postAnyAuth("movie/create", data, auth)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
  return (
    <>
      <div className="flex items-center mt-10 justify-center">
        <button
          onClick={handleClick}
          className="flex px-5 py-2 text-white dark:text-black rounded bg-black dark:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add movie recommendation
        </button>
      </div>
    </>
  );
}

export default ManageMovies;
