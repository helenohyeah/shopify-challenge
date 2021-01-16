// Components
import SearchBar from './SearchBar.js';
import Results from './Results.js';
import Nominations from './Nominations.js';

// Hooks
import useSearch from '../hooks/useSearch.js';
import useVisualMode from '../hooks/useVisualMode.js';

export default function Main() {

  // Modes
  const EMPTY = 'EMPTY';
  const LOADING = 'LOADING';
  const RESULTS = 'RESULTS';
  const ERROR = 'ERROR';

  // Declare state
  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState([]);

  // Initialize hooks
  const { handleSearch } = useSearch();
  const { mode, transition } = useVisualMode(EMPTY);
  
  // Update results when search terms change
  React.useEffect(() => {
    !searchValue ? transition(EMPTY) : transition(LOADING);

    // Wait for user to stop typing before making api call
    const debounceTimer = setTimeout(() => {
      if(searchValue) {
        handleSearch(searchValue)
          .then(res => {
            if(res.data.Response === 'True') {
              setResults(res.data.Search);
              setErrMsg('');
              transition(RESULTS);
            } else {
              setResults([]);
              setErrMsg(res.data.Error);
              transition(ERROR);
            }
          });
      }
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
        mode={mode}
      />
      <Nominations
        nominations={nominations}
        onNomination={setNominations}
      />
    </main>
  );
}