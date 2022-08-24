import './App.scss';
import {City} from './component/cities/City'

import { Component } from 'react'

export class App extends Component {
  
  readonly cities=[
    {
        id:1,
        cityName:'OTTAWA',
        longitude:'45.4215',
        latitude:'75.6972',

    },
    {
        id:2,
        cityName:'MOSCOW',
        longitude:'55.7558',
        latitude:'37.6173'
    },
    {
        id:3,
        cityName:'TOKYO',
        longitude:'139.839478',
        latitude:'35.652832'
    }

];

  render() {
    return (
      <div>
         <header className="App-header">
      <City cities={this.cities}></City>
      </header>
      </div>
    )
  }
}

export default App

