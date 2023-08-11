import './App.css';
import React from 'react';
import Header from './components/Header/Header.tsx';
import Main from './components/Main/Main.tsx';
import { Provider } from 'react-redux';
import { store } from "../src/store/index.ts";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
