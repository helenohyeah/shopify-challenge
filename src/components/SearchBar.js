export default function SearchBar(props) {
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