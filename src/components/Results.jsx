export default function Results(props) {

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