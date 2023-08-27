/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getAnyApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
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


const TABLE_HEAD = [
  "Image",
  "Title",
  "Genre",
  "Director",
  "Year",
  "Actors",
  "Plot",
  "Runtime",
  "Rating",
  "Language",
  "Country",
  "Edit",
  "Delete"
];


export function TableData({toggle}) {
  const [movieData, setMovieData] = useState([]);
  const [ trigger, setTrigger] =useState(false);
  const dispatch = useDispatch();
const auth =  useSelector((state)=>state.token);

const handleDelete = (id)=>{
    dispatch(toogleLoading())
    getAnyApi("movie/delete?movie="+id,auth)
    .then((res)=>{
        console.log(res.data);
        setTrigger(!trigger);
        dispatch(toogleLoading())
    }).catch((err)=>{
        console.log(err);
        dispatch(toogleLoading())
    })
}

  console.log(auth);
  const handleUpdate = (id) => {

    const targetObject = movieData.find((obj) => obj._id === id);
    Swal.fire({
      title: "Enter your movie recommendation",
      html:
        `<input id="title" value="${targetObject.title}" class="swal2-input" placeholder="Title">` +
        `<input id="genre" value="${targetObject.genre}" class="swal2-input" placeholder="Genre">` +
        `<input id="director" value="${targetObject.director}" class="swal2-input" placeholder="Director">` +
        `<input id="year" value="${targetObject.year}" class="swal2-input" placeholder="Year">` +
        `<input id="actors" value="${targetObject.actors}" class="swal2-input" placeholder="Actors">` +
        `<input id="plot" value="${targetObject.plot}" class="swal2-input" placeholder="Plot">` +
        `<input id="runtime" value="${targetObject.runtime}" class="swal2-input" placeholder="Runtime">` +
        
        `<input type="file" id="image" accept="image/*" class="swal2-input" placeholder="Upload Image">` +
        `<input id="language" value="${targetObject.language}" class="swal2-input" placeholder="Language">` +
        `<input id="country" value="${targetObject.country}" class="swal2-input" placeholder="Country">`,
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
        dispatch(toogleLoading())
        const formData = new FormData();
        formData.append("file", result.value.image);
        formData.append("upload_preset", "n0d0jino");
        const response = await uploadImage(formData);

        const imageUrl = response.data.secure_url;

        const croppedUrl = imageUrl.replace(
          "/upload/",
          "/upload/c_fill,g_auto,h_800,w_1200/"
        );

        result.value.image = croppedUrl;
        result.value.id = targetObject._id;
        

        const data = result.value;
        console.log(data)
        postAnyAuth("movie/update", data, auth)
          .then((response) => {
            console.log(response.data);
            setTrigger(!trigger)
            dispatch(toogleLoading())
          })
          .catch((error) => {
            console.error(error);
            dispatch(toogleLoading())
          });
      }
    });
  };

  useEffect(() => {
    // Fetch movie data from the backend API using getAny
    dispatch(toogleLoading())
    getAnyApi("movie/fetch",auth) // Replace "movie" with the actual API endpoint
      .then((response) => {
        setMovieData(response.data.data);
        dispatch(toogleLoading())
      })
      .catch((error) => {
        console.error(error);
        dispatch(toogleLoading())
      });
  }, [toggle,trigger]);
  const TABLE_ROWS = movieData;
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD?.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ 
            _id, title,
            genre,
            director,
            year,
            actors,
            plot,
            runtime,
            image,
            language,
            country, }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={title}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <img className="w-32 h-32" src={image} alt="img1" />
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {genre}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {director}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {year}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {actors}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {plot}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {runtime}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Nil
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {language}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {country}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium border-2 p-2 rounded"
                    onClick={()=>handleUpdate(_id)}
                  >
                    Edit
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium border-2 p-2 rounded"
                    onClick={()=>handleDelete(_id)}
                  >
                    Delete
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
