import React, { useState, useEffect } from "react";
import InfoIcon from "@material-ui/icons/Info";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import axios from "../axios";
import requests from "../requests";

import "../styles/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${
          movie && movie.backdrop_path
        }")`,
        backgroundPosition: "top",
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {(movie && movie.title) ||
            (movie && movie.name) ||
            (movie && movie.original_name)}
        </h1>

        <h1 className='banner__description'>
          {truncate(movie && movie.overview, 150)}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button banner__button1'>
            <PlayArrowIcon className='banner__button--icon' /> Play
          </button>

          <button className='banner__button banner__button2'>
            <InfoIcon className='banner__button--icon' /> More Info
          </button>
        </div>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  );
}

export default Banner;

//{movie?.title || movie?.name || movie?.original_name}
