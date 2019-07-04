import React from 'react';
import './App.css';
import StartPage from './containers/StartPage';
import {store} from './store'
import {Provider} from 'react-redux'

function App() {
  return (
    <div className="App jumbotron">
        <Provider store={store}>
          <StartPage></StartPage>
        </Provider>
    </div>
  );
}

export default App;
