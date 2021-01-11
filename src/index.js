'use strict';


function Header() {
  return (
    <header>
      <h1>The Shoppies</h1>
    </header>
  );
}

function Search() {

  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="search">
      <label htmlFor="search">Movie Title:</label>
      <input 
        type="text"
        name="search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
}

function Results() {
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
    <Results />
    <Nominations />
  </div>
  ,
  document.getElementById('root')
);