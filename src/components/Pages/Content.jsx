import { useEffect, useState } from "react";
import { getWithoutAuth } from "../../api/api";

function Content() {
  const [movies, setMovies] = useState();
  const [sorter, setSort] = useState();
  const [yearFilter, setYear]=useState("");
  const [sortFilter,setsortFilter]=useState("");
  const [genreFilter,setGenre]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10; // Adjust as needed
  const [searchQuery,setSearch]=useState("");
  useEffect(() => {
    getWithoutAuth(`movie/all?sortby=${sortFilter}&genreFilter=${genreFilter}&yearFilter=${yearFilter}&search=${searchQuery}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`)
      .then((res) => {
        setMovies(res.data.movies);
        console.log(res);
        setSort({ genre: res.data.genre, year: res.data.year });
        setTotalPages(Math.ceil(res.data.totalItems / itemsPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [yearFilter,sortFilter,genreFilter,currentPage,searchQuery]);

  const movieCards = movies?.map((items) => {
    return (
      <>
        <div key={items._id} className="flex items-center justify-center">
          <div className="card">
            <div
              className="card2 p-6"
              style={{
                backgroundImage: `url("${items.image}")`,
                backgroundSize: "320px 350px",
                backgroundPosition: "center",
              }}
            >
              <h1 className="md:text-xl text-lg font-bold text-white">
                {items.title}
              </h1>
              <p className="text-sm font-medium text-white">{items.genre}</p>
              <p className="text-sm text-white mt-48 font-semibold">
                Directed by {items.director}
              </p>
              <p className="text-sm text-white my-4 font-bold">{items.year}</p>
            </div>
          </div>
        </div>
      </>
    );
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div>
      <div className="w-full flex items-center justify-center my-4">
      <div className="input-container">
    <input type="text" name="text" onChange={(e)=>setSearch(e.target.value)} value={searchQuery} className="input" placeholder="Search something..." />
  <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" className="icon"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <rect fill="white" height="24" width="24"></rect> <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
    </div>
      </div>
      <div className="grid text-black dark:text-white grid-cols-3 md:p-3 p-1">
          <div className="md:col-span-1 col-span-3 flex justify-center ">
            <label
              className="p-3 border rounded shadow w-52"
              htmlFor="sort-order"
            >
              Sort by:
            </label>
            <select
              className="p-3 border  dark:text-black rounded shadow w-52 focus:outline-none"
              id="sort-order"
              value={sortFilter}
              onChange={(e)=>{setsortFilter(e.target.value)}}
            >
              <option value="">None</option>
              <option value="titel">TItle</option>
              <option value="genre">Genre</option>
              <option value="year">year</option>
              <option value="runtime">runtime</option>
              <option value="director">Director</option>
              <option value="language">Language</option>
              <option value="country">Country</option>
            </select>
          </div>
          <div className="md:col-span-1 col-span-3 flex justify-center ">
            <label
              className="p-3 border rounded shadow w-52"
              htmlFor="year-filter"
            >
              Year:
            </label>
            <select
              className="p-3 dark:text-black border rounded shadow w-52 focus:outline-none"
              id="field-of-study-filter"
              value={yearFilter}
              onChange={(e)=>{setYear(e.target.value)}}
            >
              <option value="">All</option>
              {sorter?.year?.map((items) => {
                return <option key={items} value={items}>{items}</option>;
              })}
            </select>
          </div>
          <div className="md:col-span-1 col-span-3 flex justify-center ">
          <label
              className="p-3 border rounded shadow w-52"
              htmlFor="year-filter"
            >
              Genre:
            </label>
            <select
              className="p-3 dark:text-black border rounded shadow w-52 focus:outline-none"
              id="field-of-study-filter"
              value={genreFilter}
              onChange={(e)=>{setGenre(e.target.value)}}
            >
              <option value="">All</option>
              {sorter?.genre?.map((items) => {
                return <option key={items} value={items}>{items}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className=" grid items-center justify-center md:grid-cols-3 grid-cols-1 gap-3 p-5 pt-9">
        {movies ? (
          movieCards
        ) : (
          <p className="text-xl font-bold text-black dark:text-white col-span-3">
            No movie recomendations found
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 mr-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Content;
