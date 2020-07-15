import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { PhoneNumbers } from './features/phone-numbers/PhoneNumbers';
import { Header } from './features/header/Header';

function App() {
  
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body>
            <PhoneNumbers />
        </body>
        <div style={{'margin-bottom':'2em'}}></div>
      </div>
    );
}

export default App;
