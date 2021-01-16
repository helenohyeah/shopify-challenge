import Banner from "./Banner.js";

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
      {nominationsList.length >= 5 && 
        <Banner
          secondaryClass="success"
          content="You nominated 5 movies—you're done!"
        />
      }
      <h2>Nominations</h2>
      {!nominationsList[0] && <p>You haven't nominated any movies.</p>}
      {nominationsList[0] && <ul>{nominationsList}</ul>}
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