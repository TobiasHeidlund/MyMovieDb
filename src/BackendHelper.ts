import axios from "axios";
import useMovieStore from "./stores/MovieStore"
import Movie from "./models/MovieType";

class BackendHelper {
    private static readonly port = 8080;
    private static readonly baseUrl = "http://localhost:" + this.port
    private apikey: String;
    private store = useMovieStore(state => ({
        movies: state.movies,
        loadMovies: state.loadMovies,
        updateMovie: state.updateMovie,
        removeMovie: state.removeMovie,
        addMovie: state.addMovie
    }));

    public constructor(apikey: String) {
        this.apikey = apikey;
    }

    private getUrl(apikey: String) {
        return BackendHelper.baseUrl + `/api/movies?key=${apikey}`
    }

    private static getKeyUrl() {
        return BackendHelper.baseUrl + "/api/keys"
    }

    private addMovieUrl(apikey: String) {
        return BackendHelper.baseUrl + `/api/movies?key=${apikey}`
    }

    private removeMovieUrl(apikey: String, imdbid: String) {
        return BackendHelper.baseUrl + `/api/movies/${imdbid}?key=${apikey}`
    }

    private likeMovieUrl(apikey: String, imdbid: String) {
        return BackendHelper.baseUrl + `/api/movies/${imdbid}?key=${apikey}`
    }

    private getLoginUrl() {
        return BackendHelper.baseUrl + `/api/auth/login`
    }

    private getRegisterUrl() {
        return BackendHelper.baseUrl + `/api/auth/register`
    }

    private getLogoutUrl() {
        return BackendHelper.baseUrl + `/api/auth/logout`
    }

    public login(username: string, password: string, onFailure: (msg: string) => void, onSuccess: (username: string) => void) {
        axios.post(this.getLoginUrl(), { "username": username, "password": password }).then(
            response => {
                if (response.status != 200) {
                    onFailure("Login Failed")
                }
                onSuccess(username)
                console.log(response)
            }
        ).catch(
            exeption => {
                onFailure("Request Failed")
                console.log(exeption)
            }
        )
    }

    public register(username: string, password: string, resposeMsg: (msg: string) => void) {
        axios.post(this.getRegisterUrl(), { "username": username, "password": password }).then(
            response => {
                if (response.status != 200) {
                    resposeMsg("Login Failed")
                } else {
                    resposeMsg("Account Created")
                }
                console.log(response)
            }
        ).catch(
            exeption => {
                resposeMsg("Request Failed")
                console.log(exeption)
            }
        )
    }

    public logout(username: string) {
        axios.post(this.getLogoutUrl(), { "username": username }).then(
            response => {
                if (response.status != 200) {
                }
                console.log(response)
            }
        )
    }

    public static getKey(onSuccess: (apiKey: string) => void) {
        axios.get(BackendHelper.getKeyUrl()).then(
            respose => {
                onSuccess(respose.data.data)
            }
        )
    }


    public getMovies() {
        axios.get(this.getUrl(this.apikey)).then(
            respose => {
                this.store.loadMovies(respose.data.data)
            }
        )
    }
    public likeMovie(imdbid: String) {
        axios.put(this.likeMovieUrl(this.apikey, imdbid)).then(
            respose => {
                this.store.updateMovie(respose.data.data)
                console.log(respose.data)
            }
        )
    }
    public removeMovie(imdbid: String) {
        axios.delete(this.removeMovieUrl(this.apikey, imdbid)).then(
            respose => {
                this.store.removeMovie(respose.data.data)
                console.log(respose.data)
            }
        )
    }
    public addMovie(title: string, poster: string, trailer: string) {
        axios.post(this.addMovieUrl(this.apikey), { title: title, poster: poster, trailer_link: trailer }).then(
            respose => {
                this.store.addMovie(respose.data.data)
                console.log(respose.data)
            }
        )
    }

}

export default BackendHelper