import { config } from '../config.js'

export default function useSearch() {

  function handleSearch(searchValue) {
    return axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: config.OMDB_API_KEY,
        s: searchValue
      }
    })
      .catch(err => {
        console.log(err);
      });
  }

  return { handleSearch };
}