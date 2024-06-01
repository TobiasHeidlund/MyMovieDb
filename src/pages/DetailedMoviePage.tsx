import React from 'react'
import  logo from '../assets/logo.png'
import star from '../assets/starUnfilled.svg' 
import back from '../assets/back.svg' 
import './css/DetailedMoviePage.css'
function DetailedMoviePage() {
  return (
    <main className='detailed-movie-wrapper'>
        <img className="logo" src={logo}></img>
        <section>
            <h1 className="title">{"The Shawshank Redemption"}</h1>
            <img className="poster-frame" src={"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"}></img>
            <iframe className='movie-frame' src={"https://www.youtube.com/embed/NmzuHjWmXOc"}></iframe>
            <img className='star-img' src={star}></img>
            <img className='back-img' src={back}></img>
        </section>
    </main>
  )
}

export default DetailedMoviePage