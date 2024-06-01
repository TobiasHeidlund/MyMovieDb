import React from 'react'
import './css/MovieListItem.css'
import starIcon from '../assets/starUnfilled.svg'
import starFilledIcon from '../assets/starFilled.svg'
import trashIcon from '../assets/trash.svg'
import Movie from '../models/MovieType'
import BackendHelper from '../BackendHelper'
import useApiKeyStore from '../stores/ApiKeyStore'
type Props = {
  movie : Movie
}

function MovieListItemComponent({movie}:Props) {
  const {apiKey} = useApiKeyStore(state => ({
    apiKey : state.apiKey
  }));

  const backendhelper = new BackendHelper(apiKey)
  return (
    <article className='movie-list-container'>
        <img src={movie.poster} 
            alt="Image Poster" className="poster-image" />
        <h2 className="movie-title">{movie.title}</h2>    
        <img src={movie.is_favorite? starFilledIcon : starIcon} alt="Like Icon" className="like-movie-icon" onClick={ () => {
          backendhelper.likeMovie(movie.imdbid)
         }}/>
        <img src={trashIcon} alt="Trash Icon" className="remove-icon" onClick={ () => {
          backendhelper.removeMovie(movie.imdbid)
         }} />
    </article>
  )
}

export default MovieListItemComponent