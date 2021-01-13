'use strict';

import { config } from "./config.js";

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
    axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .then(res => {
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
        value={searchValue}
        onValueChange={setSearchValue}
      />
      {nominations.length >= 5 && <Banner />}
      <Results
        searchValue={searchValue}
        results={results}
        error={errMsg}
        nominations={nominations}
        onNomination={setNominations}
      />
      <Nominations
        nominations={nominations}
        onNomination={setNominations}
      />
    </main>
  );
}

function SearchBar(props) {
  return (
    <div className="search box">
      <input 
        type="search"
        name="search"
        value={props.value}
        onChange={e => props.onValueChange(e.target.value)}
        placeholder="Search by movie title"
      />
    </div>
  );
}

function Banner() {
  return <div className="banner box"><p>You nominated 5 movies - You're done! Check back in to see who won.</p></div>;
}

function Results(props) {

  // check if movie is nominated
  const isNominated = id => props.nominations.some(nomination => nomination.id === id);
  // check to disable nominate button, true if movie is nominated or user has 5 nominations
  const isDisabled = id => isNominated(id) || props.nominations.length === 5;

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';

  const resultsList = props.results.map(movie => {
    const id = movie.imdbID;
    const title = movie.Title;
    const year = movie.Year;

    return (
      <li key={id}>
        {title} ({year}) <NominateBtn movie={{ id, title, year }} onNomination={props.onNomination} disabled={isDisabled(id)} />
      </li>
    );
  });

  return (
    <div className="results box">
      <h2>{title}</h2>
      {!props.searchValue && <p>Type in the movie title you want to nominate</p>}
      {props.searchValue && props.error && <p>{props.error}</p>}
      {resultsList && <ul>{resultsList}</ul>}
    </div>
  );
}

function NominateBtn(props) {
  return (
    <button
      onClick={() => props.onNomination(prev => [...prev, props.movie])}
      disabled={props.disabled}
    >Nominate</button>
  );
}

function Nominations(props) {
  const nominationsList = props.nominations.map(nomination => {
    const { id, title, year } = nomination;
    return (
      <li key={id}>
        {title} ({year}) <RemoveBtn movieId={id} onNomination={props.onNomination} />
      </li>
    );
  });

  return (
    <div className="nominations box">
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
      onClick={() => props.onNomination(prev => prev.filter(nomination => nomination.id !== props.movieId))}
    >Remove</button>
  );
}

ReactDOM.render(
  <div>
    <Header />
    <Main />
  </div>
  ,
  document.getElementById('root')
);