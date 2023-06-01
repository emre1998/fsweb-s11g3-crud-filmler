import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: "",
    description: "",
  });
const history=useHistory();

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:9000/api/movies", movie)
    .then((res) => {
        console.log("Film eklendi:", res.data);
       const updatedMovies = [...movie, res.data];
      setMovie(updatedMovies)
      history.push("/movies");
    })
    .catch((err) => {
        console.log(err);
    });
    
    console.log(movie);
    setMovie({
      title: "",
      director: "",
      genre: "",
      metascore: "",
      description: "",
    });
  };
  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold color text-success">Ekleniyor <strong>{movie.title}</strong></h4>
        </div>
        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director}
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore}
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <Link to={`/movies`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button
            type="submit" 
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
 
 


};

export default AddMovieForm;