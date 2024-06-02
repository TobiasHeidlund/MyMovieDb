import React from 'react'
import "./css/AddMovieComponent.css"
import useMovieStore from '../stores/MovieStore';
import BackendHelper from '../BackendHelper';
import useApiKeyStore from '../stores/ApiKeyStore';
import Movie from '../models/MovieType';
type Props = {
  apikey: string,
}
function AddMovieComponent({ apikey }: Props) {
  const backendhelper = new BackendHelper(apikey)


  function submitForm(formData: React.FormEvent<HTMLFormElement>) {
    formData.preventDefault()
    let title = (document.getElementById("title") as HTMLInputElement);
    let poster = (document.getElementById("poster") as HTMLInputElement);
    let trailer = (document.getElementById("trailer") as HTMLInputElement);
    backendhelper.addMovie(title.value, poster.value, trailer.value)

    formData.currentTarget.reset()
  }

  return (
    <form className="add-movie-container" onSubmit={submitForm}>
      <input type="text" id="title" placeholder="Enter title:" required minLength={3} className="title-input" />
      <input type="url" id="poster" placeholder="Enter poster url:" required className="poster-input" />
      <input type="url" id="trailer" placeholder="Enter trailer url:" required className="trailer-input" />
      <input type="submit" className="submit-button" />
    </form>
  )
}

export default AddMovieComponent