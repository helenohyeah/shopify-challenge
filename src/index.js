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
  const [result, setResult] = React.useState([]);
  // console.log(config.OMDB_API_KEY);

  // search using OMDB api when search terms change
  React.useEffect(() => {
    axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .then(res => {
        // console.log(res.data);
        if (res.data.Response === 'True') setResult(res.data.Search);
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
        data={result}
      />
    </div>
  );
}

function Results(props) {
  console.log(props.data);
  return (
    <div className="results">
      <h2>Results</h2>
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