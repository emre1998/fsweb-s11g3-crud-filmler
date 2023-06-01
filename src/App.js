import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect,useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from './components/MovieHeader';
import AddMovieForm from "./AddMovieForm";
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movies, setMovies]);
  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then(() => {
        const updatedMovies = movies.filter(movie => movie.id !== id);
        setMovies(updatedMovies);
        history.push("/movies");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const history = useHistory();


  const addToFavorites = (movie) => {
    const isAlreadyFavorite = favoriteMovies.some((favMovie)=> favMovie.id === movie.id);

    if(isAlreadyFavorite) {
      console.log("Film zaten favorilere eklendi!");
      return; 
    }
    setFavoriteMovies(prevFavorites => [...prevFavorites, movie]);
  
  const updateFavoriteMovie = (movieId,NewTitle)=>{
    const updateFavorites = favoriteMovies.map((movie)=>{
      if(movie.id===movieId) {
        return {...movie,title:NewTitle};
      }
      return movie;
    });
  }
  };
  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm movies={movies} setMovies={setMovies} />
            </Route>

            <Route path="/movies/add">
              <AddMovieForm history={history} />
            </Route>

            <Route path="/movies/:id">
              <Movie movies={movies} handleDelete={deleteMovie} addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
