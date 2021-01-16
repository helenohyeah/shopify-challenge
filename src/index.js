'use strict';

// Components
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

ReactDOM.render(
  <div className='container'>
    <Header />
    <Main />
    <Footer />
  </div>
  ,
  document.getElementById('root')
);