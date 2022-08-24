import React, { Component } from 'react';
import './CurrentWeather.scss';



type ChildComponentProps= {
  weather:string,
  temperature:number,
  icon:string
};

export class CurrentWeather extends Component<ChildComponentProps> {


  render() {
    return (
      <div>
        
        <div className="row">
        <p className="today">Today</p>
        <div className="column">
          <img alt="currentWeather" className="weather-icon"
            src={`http://openweathermap.org/img/wn/${this.props.icon}@4x.png`}
          ></img>
          </div>
          <div className="column">
            <p className="temperature">{Math.round(this.props.temperature)}&deg;</p>
            <p className="weather-description">{this.props.weather}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather
