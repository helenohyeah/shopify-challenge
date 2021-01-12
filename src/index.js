'use strict';

import { config } from "../config.js";

function Header() {
  return (
    <header>
      <h1>The Shoppies</h1>
    </header>
  );
}

function Search() {

  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState({});

  // search using OMDB api when search terms change
  React.useEffect(() => {
    axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .then(res => {
        console.log(res.data);
        // set search results and clear error message if response came back True
        if (res.data.Response === 'True') {
          setResults(res.data.Search);
          setErrMsg('');
        // clear search results and set error message if response came back False
        } else {
          setResults([]);
          setErrMsg(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [searchValue]);

  return (
    <div className="search">
      <label htmlFor="search">Movie Title:</label>
      <input 
        type="text"
        name="search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <Results
        searchValue={searchValue}
        data={results}
        error={errMsg}
        nominations={nominations}
        setNominations={setNominations}
      />
      <Nominations />
    </div>
  );
}

function Results(props) {

  // disable nominate button if movie is nominated
  const disableNominate = (id) => props.nominations[id] === true ? true : false;

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';
  const results = props.data.map(movie => {
    return <li key={movie.imdbID}>{movie.Title} ({movie.Year}) <Nominate id={movie.imdbID} setNominations={props.setNominations} disabled={disableNominate(movie.imdbID)} /></li>;
  });

  return (
    <div className="results">
      <h2>{title}</h2>
      <ul>
        {!props.searchValue && <p>Type something to search</p>}
        {props.searchValue && props.error && <p>{props.error}</p>}
        {results && results}
      </ul>
    </div>
  );
}

function Nominate(props) {
  return (
    <button
      onClick={() => props.setNominations(prev => {
        return { ...prev, [props.id]: true }
      })}
      disabled={props.disabled}
    >Nominate</button>
  );
}

function Nominations() {
  return (
    <div className="nominations">
      <h2>Nominations</h2>
    </div>
  );
}

ReactDOM.render(
  <div className="container">
    <Header />
    <Search />
  </div>
  ,
  document.getElementById('root')
);