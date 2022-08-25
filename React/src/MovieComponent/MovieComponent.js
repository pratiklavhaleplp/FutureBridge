import React, {useEffect,useState} from 'react';
import './MovieComponent.css'

function MovieComponent() {
    const [movies, setMovies]  = useState([]);
    const [movieName, setMovieName]  = useState([]);
    const [moviesRating, setMovieRating]  = useState([]);
    const [moviesRelease, setMoviesRelease]  = useState([]);

    function getAllMovies(){
        const url = "http://localhost:8080/movies";
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            setMovies(getProperMoviesArray(json))
        })
          .catch((error) => console.log(error));
    }
    useEffect(() => {
        getAllMovies();
      }, []);

      function getProperMoviesArray(arr){
        for(let i = 0; i<arr.length; i++){
            arr[i].movie_description = JSON.parse(arr[i].movie_description);
        }    
        console.log(arr);
        return arr;
      }

      function getMovieName(event){
        setMovieName(event.target.value);
      }

      function getMovieRatings(event){
        setMovieRating(event.target.value);
      }

      function getMovieReleaseDate(event){
        setMoviesRelease(event.target.value);
      }

      function addMovies(){
        let obj = {
            name : movieName,
            ratings : moviesRating,
            releaseDate : moviesRelease
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('http://localhost:8080/insertMovies', requestOptions)
            .then(response => response.json())
            .then(data =>{console.log(data);
                getAllMovies()});
      }

  return (
    
    <div>
        <div>
        Movie Name : <input onChange={getMovieName}></input> <br/>
        Movie Rating : <input onChange={getMovieRatings}></input><br/>
        Movie ReelaseDate :<input onChange={getMovieReleaseDate}></input><br/>
        <button onClick={addMovies}>Add Movies</button><br/>
        </div>
        { (movies.map(ele=><div key={ele.movie_id} className='test'>
            name : {ele.movie_description.name}
            <br/>
            ratings : {ele.movie_description.ratings}
            <br/>
            release date : {ele.movie_description.releaseDate}
            </div>))}
    </div>
  );
}

export default MovieComponent;
