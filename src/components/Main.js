// Components
import SearchBar from './SearchBar.js';
import Results from './Results.js';
import Nominations from './Nominations.js';

// Hooks
import useSearch from '../hooks/useSearch.js';

export default function Main() {

  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState([]);
  const { handleSearch } = useSearch();

  // update results when search terms change
  React.useEffect(() => {
    // wait for user to stop typing before making api call
    const debounceTimer = setTimeout(() => {
      handleSearch(searchValue)
        .then(res => {
          if(res.data.Response === 'True') {
            setResults(res.data.Search);
            setErrMsg('');
          } else {
            setResults([]);
            setErrMsg(res.data.Error);
          }
        });
    }, 1000);

    return () => clearTimeout(debounceTimer);
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