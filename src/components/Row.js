import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import movieTrailer from "movie-trailer";
import axios from "../axios";
import "../styles/Row.css";

function Row({ title, fetchUrl, isLargeRow, trendingNow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    // Need to run async inside useEffect you need to make a internal function and inside there we do all fetching then after you just call the funcition

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };

  const getTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        (movie && movie.name) ||
          movie.original_name ||
          movie.original_title ||
          movie.title
      )
        .then((responseUrl) => {
          const urlParams = new URL(responseUrl).search;
          const finalUrlParams = new URLSearchParams(urlParams);
          setTrailerUrl(finalUrlParams.get("v"));

          /* https://www.youtube.com/watch?v=XtMThy8QKqU&banana=5
        new URL(url).search; will give v=XtMThy8QKqU&banana=5
        then wrap that in a new URLSearchParam which allows us to do a GET for the stuff for what the parameter we want is equal to 
        urlParams.get('v') gives XtMThy8QKqU
        */
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onHover = () => {
    document.getElementById("row__trendingNow").scrollBy({
      left: -4000,
      top: 100,
      behavior: "smooth",
    });
  };

  const ref = useRef();

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={`row ${trendingNow && "row__trendingNow"}`}>
      <h2>{title}</h2>
      <div className='row__posters' ref={ref}>
        <button
          onClick={() => scroll(-700)}
          className='row__poster--buttonLeft'
        >
          <ArrowBackIosIcon
            style={{
              fontSize: "50px",
            }}
            className='row__poster--buttonIcon'
          />
        </button>
        {movies.map((movie) => (
          <div>
            <img
              onClick={() => getTrailer(movie)}
              key={movie.id}
              className={`row__posters--img ${
                isLargeRow && "row__poster--imgLarge"
              }`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      <button onClick={() => scroll(700)} className='row__poster--buttonRight'>
        <ArrowForwardIosIcon
          style={{
            fontSize: "50px",
          }}
          className='row__poster--buttonIcon'
        />
      </button>
    </div>
  );
}

export default Row;
