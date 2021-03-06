import Banner from './Banner.js';

export default function Results(props) {

  // check if movie is nominated
  const isNominated = id => props.nominations.some(nomination => nomination.id === id);
  // check to disable nominate button, true if movie is nominated or user has 5 nominations
  const isDisabled = id => isNominated(id) || props.nominations.length === 5;

  const heading = props.searchValue.length > 0 ? `Search Results for "${props.searchValue}"` : 'Search Results';

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
      <h2>{heading}</h2>
      {props.mode === 'EMPTY' && <p>Start searching for movies you want to nominate!</p>}
      {props.mode === 'LOADING' && 
        <div className="loading">
          <img src="../assets/film-reel-static.png"></img>
          <img id="spinner" src="../assets/film-reel.png"></img>
        </div>
      }
      {props.mode === 'ERROR' && 
        <Banner 
          secondaryClass='warning'
          content={props.error}
        />
      }
      {props.mode === 'RESULTS' && <ul>{resultsList}</ul>}
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