import React, { Component } from 'react'
import './Forecast.scss';

type ChildForecastComponentProps= {
    dailyForecast:{
        [key:string]:any
    };

    forcastDay:string
  };

export class Forecast extends Component<ChildForecastComponentProps> {


  render() {
    return (
        <div>
        <p className="day">{this.props.forcastDay}</p>
          <img alt="forecast" className="forecast-icon"
            src={`http://openweathermap.org/img/wn/${this.props.dailyForecast.weather[0].icon}@2x.png`}
          ></img>
            <h1 className="forecast-temperature">{Math.round(this.props.dailyForecast.main.temp)}&deg;</h1>
          </div>
    )
  }
}

export default Forecast
