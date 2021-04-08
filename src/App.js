import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import requests from "./requests";

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Banner />
      <div className='app__rows'>
        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
        <Row
          trendingNow
          title='Trending Now'
          fetchUrl={requests.fetchTrending}
        />
        <Row
          isLargeRow
          title='NETFLIX ORIGINALS'
          fetchUrl={requests.fetchNetflixOriginals}
        />

        <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
        <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
        <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
        <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
        <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}

export default App;
