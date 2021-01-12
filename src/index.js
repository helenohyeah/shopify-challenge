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

  // search using OMDB api when search terms change
  React.useEffect(() => {
    axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .then(res => {
        console.log(res.data);
        if (res.data.Response === 'True') {
          setResults(res.data.Search);
          setErrMsg('');
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
      />
    </div>
  );
}

function Results(props) {

  console.log(props);

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';
  const results = props.data.map((movie, index) => {
    return <li key={index}>{movie.Title} ({movie.Year})</li>;
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
    <Nominations />
  </div>
  ,
  document.getElementById('root')
);