import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Button from 'react-bootstrap/Button';

import { Counter } from './features/counter/Counter';
import { PhoneNumbers } from './features/phone-numbers/PhoneNumbers';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
  
    return (
      <div className="App">
        <header className="App-header">
          <Counter />
          <PhoneNumbers />
        </header>
      </div>
    );
}

export default App;
