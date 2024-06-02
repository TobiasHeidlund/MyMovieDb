import React from 'react'
import logo from '../assets/logo.png'
import starIcon from '../assets/starUnfilled.svg'
import starFilledIcon from '../assets/starFilled.svg'
import back from '../assets/back.svg'
import './css/DetailedMoviePage.css'
import { useParams, Link } from 'react-router-dom';
import useMovieStore from '../stores/MovieStore'
import useApiKeyStore from '../stores/ApiKeyStore'
import BackendHelper from '../BackendHelper'
function DetailedMoviePage() {

  const { id } = useParams();
  const { movies } = useMovieStore(state => ({
    movies: state.movies
  }))
  const { apiKey } = useApiKeyStore(state => ({ apiKey: state.apiKey }))
  const movie = movies.find(curMovie => (
    curMovie.imdbid === id
  ))
  const backendhelper = new BackendHelper(apiKey)
  return (
    <main className='detailed-movie-wrapper'>
      <img className="logo" src={logo}></img>
      <section>
        <h1 className="title">{movie!!.title}</h1>
        <img className="poster-frame" src={movie!!.poster}></img>
        <iframe className='movie-frame' src={movie!!.trailer_link}></iframe>
        <img src={movie!!.is_favorite ? starFilledIcon : starIcon} alt="Like Icon" className="star-img" onClick={() => {
          backendhelper.likeMovie(movie!!.imdbid)
        }} />
        <Link to={-1}><img className='back-img' src={back} ></img></Link>
      </section>
    </main>
  )
}

export default DetailedMoviePage