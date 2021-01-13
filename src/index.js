'use strict';

import { config } from "../config.js";

function Header() {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, "The Shoppies"));
}

function Main() {
  const [searchValue, setSearchValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errMsg, setErrMsg] = React.useState('');
  const [nominations, setNominations] = React.useState([]); // search using OMDB api when search terms change

  React.useEffect(() => {
    axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    }).then(res => {
      console.log(res.data); // set search results and clear error message if response came back True

      if (res.data.Response === 'True') {
        setResults(res.data.Search);
        setErrMsg(''); // clear search results and set error message if response came back False
      } else {
        setResults([]);
        setErrMsg(res.data.Error);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [searchValue]);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(SearchBar, {
    value: searchValue,
    onValueChange: setSearchValue
  }), nominations.length >= 5 && /*#__PURE__*/React.createElement(Banner, null), /*#__PURE__*/React.createElement(Results, {
    searchValue: searchValue,
    results: results,
    error: errMsg,
    nominations: nominations,
    onNomination: setNominations
  }), /*#__PURE__*/React.createElement(Nominations, {
    nominations: nominations,
    onNomination: setNominations
  }));
}

function SearchBar(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "search box"
  }, /*#__PURE__*/React.createElement("input", {
    type: "search",
    name: "search",
    value: props.value,
    onChange: e => props.onValueChange(e.target.value),
    placeholder: "Search by movie title"
  }));
}

function Banner() {
  return /*#__PURE__*/React.createElement("div", {
    className: "banner box"
  }, /*#__PURE__*/React.createElement("p", null, "You nominated 5 movies - You're done! Check back in to see who won."));
}

function Results(props) {
  // check if movie is nominated
  const isNominated = id => props.nominations.some(nomination => nomination.id === id); // check to disable nominate button, true if movie is nominated or user has 5 nominations


  const isDisabled = id => isNominated(id) || props.nominations.length === 5;

  const title = props.searchValue.length > 0 ? `Results for "${props.searchValue}"` : 'Results';
  const resultsList = props.results.map(movie => {
    const id = movie.imdbID;
    const title = movie.Title;
    const year = movie.Year;
    return /*#__PURE__*/React.createElement("li", {
      key: id
    }, title, " (", year, ") ", /*#__PURE__*/React.createElement(NominateBtn, {
      movie: {
        id,
        title,
        year
      },
      onNomination: props.onNomination,
      disabled: isDisabled(id)
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "results box"
  }, /*#__PURE__*/React.createElement("h2", null, title), !props.searchValue && /*#__PURE__*/React.createElement("p", null, "Type in the movie title you want to nominate"), props.searchValue && props.error && /*#__PURE__*/React.createElement("p", null, props.error), resultsList && /*#__PURE__*/React.createElement("ul", null, resultsList));
}

function NominateBtn(props) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => props.onNomination(prev => [...prev, props.movie]),
    disabled: props.disabled
  }, "Nominate");
}

function Nominations(props) {
  const nominationsList = props.nominations.map(nomination => {
    const {
      id,
      title,
      year
    } = nomination;
    return /*#__PURE__*/React.createElement("li", {
      key: id
    }, title, " (", year, ") ", /*#__PURE__*/React.createElement(RemoveBtn, {
      movieId: id,
      onNomination: props.onNomination
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nominations box"
  }, /*#__PURE__*/React.createElement("h2", null, "Nominations"), /*#__PURE__*/React.createElement("ul", null, nominationsList));
}

function RemoveBtn(props) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => props.onNomination(prev => prev.filter(nomination => nomination.id !== props.movieId))
  }, "Remove");
}

ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Main, null)), document.getElementById('root'));