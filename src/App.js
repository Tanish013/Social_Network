import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './Component/MainPage'
import {BrowserRouter} from 'react-router-dom';
class App extends Component {

  render(){
  return (
    <BrowserRouter>
    <MainPage />
    </BrowserRouter>
  );
}
}

export default App;
