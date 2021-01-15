// Components
import SearchBar from './SearchBar.js';
import Results from './Results.js';
import Nominations from './Nominations.js';

// Hooks
import useSearch from '../hooks/useSearch.js';

export default function Main(props) {

  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState([]);
  const { handleSearch } = useSearch();

  // search using OMDB api when search terms change
  React.useEffect(() => {
    handleSearch(searchValue, setResults, setErrMsg);
  }, [searchValue]);

  return (
    <main>
      <SearchBar
        value={searchValue}
        onValueChange={setSearchValue}
      />
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