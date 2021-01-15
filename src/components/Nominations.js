export default function Nominations(props) {
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