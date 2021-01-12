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
  const [nominations, setNominations] = React.useState([]);

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
      <Nominations
        nominations={nominations}
      />
    </div>
  );
}

function Results(props) {

  // returns index of nomination given movie id
  const findIndexOfNomination = id => props.nominations.findIndex(nomination => nomination.id === id);
  // checks for nomination to disable nominate button
  const checkForNomination = id => findIndexOfNomination(id) !== -1 ? true : false;

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';

  const resultsList = props.data.map(movie => {
    const id = movie.imdbID;
    const title = movie.Title;
    const year = movie.Year;

    return (
      <li key={id}>
        {title} ({year}) <NominateBtn key={id} movie={{ id, title, year }} setNominations={props.setNominations} disabled={checkForNomination(id)} />
      </li>
    );
  });

  return (
    <div className="results">
      <h2>{title}</h2>
      <ul>
        {!props.searchValue && <p>Type something to search</p>}
        {props.searchValue && props.error && <p>{props.error}</p>}
        {resultsList && resultsList}
      </ul>
    </div>
  );
}

function NominateBtn(props) {
  return (
    <button
      onClick={() => props.setNominations(prev => [...prev, props.movie])}
      disabled={props.disabled}
    >Nominate</button>
  );
}

function Nominations(props) {
  const nominationsList = props.nominations.map(nomination => {
    return (
      <li key={nomination.id}>
        {nomination.title} ({nomination.year}) <RemoveBtn />
      </li>
    );
  });

  return (
    <div className="nominations">
      <h2>Nominations</h2>
      <ul>
        {nominationsList}
      </ul>
    </div>
  );
}

function RemoveBtn(props) {
  return (
    <button>Remove</button>
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