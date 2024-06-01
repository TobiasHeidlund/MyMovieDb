import { create } from 'zustand';
import MovieType from '../models/MovieType'

type MovieStore = {
    movies :MovieType[],
    loadMovies : (newMovies:MovieType[])=>void,
    updateMovie : (movies:MovieType)=>boolean,
    removeMovie : (movies:MovieType[])=>void,
    addMovie : (movies:MovieType)=>void
}

const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    loadMovies: (newMovies) => {
        set({movies : newMovies })
    },
    updateMovie: (movie)=>{
        var updated = false;
        set(state => ({
            movies: state.movies.map(currentMovie => {
                if(movie.imdbid === currentMovie.imdbid){
                    updated = true
                    return movie;  
                }
                return currentMovie;
            }
            )
        }))
        return updated;
    },
    removeMovie: (movies)=>{
        console.log(movies)
        set(state => ({
                movies: state.movies.filter(moviesListItem => 
                    movies.find(item => item.imdbid==moviesListItem.imdbid)===undefined
                )}
            )
        )
    },
    addMovie: (movies)=>{
        console.log(movies)
        set(state => ({
            movies: [...state.movies, movies ]
        }))

    }

}))
export default useMovieStore;
