import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Button from 'react-bootstrap/Button';

import { Counter } from './features/counter/Counter';
import { PhoneNumbers } from './features/phone-numbers/PhoneNumbers';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './features/header/Header';

function App() {
    const dispatch = useDispatch();
  
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
