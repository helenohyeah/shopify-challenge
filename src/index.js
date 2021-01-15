'use strict';

import { config } from './config.js';

// Components
import Header from './components/Header.js';
import Main from './components/Main.js';

ReactDOM.render(
  <div>
    <div id="carpet"></div>
    <Header />
    <Main 
      config={config}
      />
  </div>
  ,
  document.getElementById('root')
);