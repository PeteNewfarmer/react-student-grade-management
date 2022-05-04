import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Students } from './components/Students'
class App extends React.Component {

  render() {
    return(
      <>
        <h1>All Students</h1>
        <Students />
      </>
    )
  }
}

export default App;
