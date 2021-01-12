'use strict';

import { config } from "../config.js";

function Header() {
  return (
    <header>
      <h1>The Shoppies</h1>
    </header>
  );
}

function Main() {

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
    <main>
      <SearchBar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {nominations.length >= 5 && <Banner />}
      <Results
        searchValue={searchValue}
        data={results}
        error={errMsg}
        nominations={nominations}
        setNominations={setNominations}
      />
      <Nominations
        nominations={nominations}
        setNominations={setNominations}
      />
    </main>
  );
}

function SearchBar(props) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Movie Title:</label>
      <input 
        type="text"
        name="search"
        value={props.searchValue}
        onChange={e => props.setSearchValue(e.target.value)}
      />
    </div>
  );
}

function Banner() {
  return <div className="banner">You nominated 5 movies - You're done! Check back in to see who won.</div>;
}

function Results(props) {

  // checks for movie in nomination list to disable or enable nominate button
  const checkForNomination = id => props.nominations.some(nomination => nomination.id === id);
  // disable nomination button if the movie is already nominated or if user has 5 nominations
  const disableNomination = id => checkForNomination(id) || props.nominations.length === 5;

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';

  const resultsList = props.data.map(movie => {
    const id = movie.imdbID;
    const title = movie.Title;
    const year = movie.Year;

    return (
      <li key={id}>
        {title} ({year}) <NominateBtn key={id} movie={{ id, title, year }} setNominations={props.setNominations} disabled={disableNomination(id)} />
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
    const { id, title, year } = nomination;
    return (
      <li key={id}>
        {title} ({year}) <RemoveBtn id={id} setNominations={props.setNominations} />
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
    <button
      onClick={() => props.setNominations(prev => prev.filter(nomination => nomination.id !== props.id))}
    >Remove</button>
  );
}

ReactDOM.render(
  <div className="container">
    <Header />
    <Main />
  </div>
  ,
  document.getElementById('root')
);