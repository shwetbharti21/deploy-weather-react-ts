import "./City.scss";
import { Component } from "react";
import { CurrentWeather } from "../../component/currentWeather/CurrentWeather";
import { Forecast } from "../../component/forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../assets/api";
import _ from "lodash";

type Props = {
  cities: {
    id: number;
    latitude: string;
    longitude: string;
    cityName: string;
  }[];
};

type State = {
  currentWeather: string;
  temperature: number;
  icon: string;
  forecastDays: string[];
  currentForecast: object[];
};

export class City extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      temperature: 0,
      currentWeather: "",
      icon: "",
      forecastDays: [],
      currentForecast: [],
    };
  }

  componentDidMount() {
    this.fetchTheWeather(
      this.props.cities[0].latitude,
      this.props.cities[0].longitude,
      this.props.cities[0].cityName
    );
  }

  //Function to highligh which city is selected
  highlightTheCurrentCity(cityName: string) {
    let value = document.getElementsByClassName("city-container")[0];
    Array.from(value.children).forEach(function (el) {
      el.setAttribute("style", "color:black;");
    });
    document
      .getElementsByClassName(cityName)[0]
      .setAttribute("style", "color:#68a7d9;font-weight: bold;");
  }

  //Get the daily forecast from the api call result
  getForecast(foreCast: Array<any>) {
      const output = foreCast.reduce((result, el) => {
        let date = el.dt_txt.split(" ")[0];
        let prevDate;
        if (result.length >= 1) {
          prevDate = result[result.length - 1].dt_txt.split(" ")[0];
        }
        return date === prevDate ? result : [...result, el];
      }, []);
  
      const array = output.splice(0, 4);
      return array;
    }

  //Function to highligh which city is selected
  getDaysInForecast() {
    const daysInWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayInAWeek = new Date().getDay();
    const forecastDays = daysInWeek
      .slice(dayInAWeek, daysInWeek.length)
      .concat(daysInWeek.slice(0, dayInAWeek));

    return forecastDays;
  }

  async fetchTheWeather(latitude: string, longitude: string, cityName: string) {
    const currentWeatherFetch = await fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        //CurrentWeather
        if(!_.isNull(weatherResponse) && !_.isNull(forcastResponse)){
        const weather = weatherResponse.weather[0].main;
        const temperature = weatherResponse.main.temp;
        const icon = weatherResponse.weather[0].icon;

        //get the forecast days
        const forecastDays = this.getDaysInForecast();
        //highlight the current selection
        this.highlightTheCurrentCity(cityName);

        //Set the states
        this.setState({
          currentWeather: weather,
          temperature: temperature,
          icon: icon,
          forecastDays: forecastDays,
          currentForecast: this.getForecast([...forcastResponse.list]),
        });
      }
    else{
      throw console.error();
      
    }
      })
      .catch(console.log);
  }



  render() {
    return (
      <>
        <div className="city-container">
          {this.props.cities.map((city) => {
            return (
              <div
                className={city.cityName}
                onClick={(e) =>
                  this.fetchTheWeather(
                    city.latitude,
                    city.longitude,
                    city.cityName
                  )
                }
                key={city.id}
              >
                {city.cityName}
              </div>
            );
          })}
        </div>
        <div className="grid-container">
          {this.state.currentWeather && (
            <div className="grid-item item1">
              <CurrentWeather
                weather={this.state.currentWeather}
                temperature={this.state.temperature}
                icon={this.state.icon}
              ></CurrentWeather>
            </div>
          )}
          {this.state.currentForecast.map((dailyForecast: any, index) => (
            <div className="grid-item" key={dailyForecast.dt_txt}>
              <Forecast
                dailyForecast={dailyForecast}
                forcastDay={this.state.forecastDays[index].substring(0, 3)}
              ></Forecast>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default City;
