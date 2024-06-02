import React from 'react'
import { useEffect } from 'react';
import MovieListItem from '../components/MovieListItemComponent'
import AddMovieComponent from '../components/AddMovieComponent'
import logo from "../assets/logo.png"
import "./css/MovieListPage.css"
import BackendHelper from '../BackendHelper'
import useMovieStore from "../stores/MovieStore"
import useApiKeyStore from "../stores/ApiKeyStore"
import useAuthStore from '../stores/AuthStore';

function MovieListPage() {
  
  const { apiKey } = useApiKeyStore(state => ({
    apiKey: state.apiKey
  }));

  const { clearUsername } = useAuthStore(state => ({
    clearUsername: state.clearUsername
  }));

  const backendhelper = new BackendHelper(apiKey)
  const { movies } = useMovieStore(state => ({
    movies: state.movies,
  }));

  useEffect(() => {
    if (apiKey != "") {
      backendhelper.getMovies()
    }
  }, [apiKey]);

  const handleLogout = () => {
    clearUsername()
  }

  return (
    <div className="view-port">
      <button className="logout-button" onClick={handleLogout}>Log out</button>
      <div className="yellow-backround">
        <img src={logo} alt="Logo" className="logo" />
        <AddMovieComponent apikey={apiKey} />
      </div>
      <main className='list-area'>
        {
          movies.map((movie, index) => {
            return <MovieListItem key={index} movie={movie} />
          })
        }

      </main>
    </div>
  )
}

export default MovieListPage