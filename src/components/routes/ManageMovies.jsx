import { TableData } from "../Layout/TableData";
import { useState } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { postAnyAuth, uploadImage } from "../../api/api";
import { toogleLoading } from "../../store/store";

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  director: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2023).required(),
  actors: Joi.string().required(),
  plot: Joi.string().required(),
  runtime: Joi.number().integer().min(0).max(1000).required(),
  
  language: Joi.string().required(),
  country: Joi.string().required(),
});

function ManageMovies() {
  const [toggle,setToggle]=useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.token);
  console.log(auth);
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
        
        '<input type="file" id="image" accept="image/*" class="swal2-input" placeholder="Upload Image">' +
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
        
        const language = document.getElementById("language").value;
        const country = document.getElementById("country").value;
        const image = document.getElementById("image").files[0]; // Get the uploaded image

        const { error, value } = schema.validate(
          {
            title,
            genre,
            director,
            year,
            actors,
            plot,
            runtime,
            
            language,
            country,
          },
          { abortEarly: false }
        );

        if (error) {
          Swal.showValidationMessage(
            error.details.map((detail) => detail.message).join("<br>")
          );
          return false;
        }

        value.image = image;
        return value;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(toogleLoading);
        const formData = new FormData();
        formData.append("file", result.value.image);
        formData.append("upload_preset", "n0d0jino");
        const response = await uploadImage(formData);

        const imageUrl = await response.data.secure_url;

        const croppedUrl = imageUrl.replace(
          "/upload/",
          "/upload/c_fill,g_auto,h_800,w_1200/"
        );

        result.value.image = croppedUrl;
        

        const data = result.value;
        console.log(data)
        
        postAnyAuth("movie/create", data, auth)
          .then((response) => {
            console.log(response.data);
            dispatch(toogleLoading);
            setToggle(!toggle);
          })
          .catch((error) => {
            console.error(error);
            dispatch(toogleLoading);
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

      <div className="mt-10 text-black dark:text-white">
        <p>Your Movie Recomendations</p>
        <TableData toggle={toggle} />
      </div>
    </>
  );
}

export default ManageMovies;
