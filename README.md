# Shopify Internship Challenge
My submission for Shopify's Web Developer Intership Challenge

Demo: [https://shopify-challenge-2021.netlify.app/](https://shopify-challenge-2021.netlify.app/)

Build in React using Axios and Sass.

## The Challenge

Shopify has branched out into movie award shows and we need your help. Please build us an app to help manage our movie nominations for the upcoming Shoppies.

We need a webpage that can search [OMDB](http://www.omdbapi.com) for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
Search OMDB and display the results (movies only)
Add a movie from the search results to our nomination list
View the list of films already nominated
Remove a nominee from the nomination list

## Technical Requirements

1. Search results should come from [OMDB's API](http://www.omdbapi.com/apikey.aspx).
2. Each search result should list at least its title, year of release and a button to nominate that film.
3. Updates to the search terms should update the result list
4. Movies in search results can be added and removed from the nomination list.
5. If a search result has already been nominated, disable its nominate button.
6. Display a banner when the user has 5 nominations.

## Extra Improvements

Improvements I'm going to work on next.

- [x] Nicer custom design
- [x] Debounce search call
- [x] Animations
- [ ] ~~Save nomination list if user leaves the page~~
- [ ] ~~Shareable links~~

## How to Run Locally

1. Install all dependencies using `npm install`.
2. Compile a build and run a local server using `npm start`.
3. It should automatically open your browser to [http://localhost:8080/](http://localhost:8080/)

Note: To change ports open package.json and add `--port [port number]` to the end of the serve script.