// Components
import SearchBar from './SearchBar.js';
import Banner from './Banner.js';
import Results from './Results.js';
import Nominations from './Nominations.js';

export default function Main(props) {

  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState([]);

  const config = props.config;

  // search using OMDB api when search terms change
  React.useEffect(() => {
    axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .then(res => {
        // set search results and clear error message if response came back True
        if (res.data.Response === 'True') {
          setResults(res.data.Search);
          setErrMsg('');
        // clear search results and set error message if response came back False
        } else {
          setResults([]);
          setErrMsg(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
      });
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