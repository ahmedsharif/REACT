import React from "react";
import PropTypes from "prop-types";
import { weatherCity } from "../api/weather-api";
import "./weather.css";

class Weather extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      value: "",
      name: this.props.city,
      country: "",
      today: "",
      list: [
        {
          dt: new Date(),
          temp: {
            day: 28
          },
          weather: [
            {
              main: "main",
              description: "desc"
            }
          ]
        }
      ],
      loaded: false,
      err: false,
      errMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.getWeather(this.state.value);
    event.preventDefault();
  }

  getWeather(city) {
    return weatherCity(city)
      .then(response => {
        console.log("fetched:", response);
        this.setState({
          name: response.city.name,
          country: response.city.country,
          cityName: response.city.name,
          list: response.list,
          today: response.list[0].weather[0].main,
          loaded: true
        });
      })
      .catch(err => {
        console.log("err: ", err);
        this.setState({
          err: true,
          errMessage: "something went wrong"
        });
      });
  }

  componentWillMount() {
    console.log("app state - localStorage", localStorage);
    this.getWeather(this.state.name);
  }

  render() {
    if (!this.state.loaded)
      return (
        <div>
          <h1>State is not loaded yet</h1>
        </div>
      );

    const { city, country, title } = this.props;
    const cityName = this.state.name ? this.state.name : city;
    const countryName = this.state.country ? this.state.country : country;
    const getWeather = this.state.today.toLowerCase();

    if (this.state.err) {
      return (
        <div className="error">
          <div className="pure-u-1-1">
            <h2>{this.state.errMessage}</h2>
          </div>
        </div>
      );
    }

    const list = this.state.list.map((item, index) => (
      <li key={"head-${index}"}>
        <span>
          <span>{Math.round(item.temp.day * 10) / 10}</span>
        </span>
        {item.weather.map((t, index2) => (
          <span key={`sub-${index}-${index2}`}>
            <span>
              <img
                src={`http://openweathermap.org/img/w/${t.icon}.png`}
                alt={`${t.main}`}
              />
            </span>
            <span>{t.description}</span>
          </span>
        ))}
        <span className="min-temp">
          <br />
          Min temp:
          {item.temp.min}
        </span>
        <span className="max-temp">
          Max temp:
          {item.temp.max}
        </span>
        <span className="pressure">
          <br />
          Pressure:
          {item.pressure}
        </span>
        <span className="humidity">
          Humidity:
          {item.humidity}
        </span>
      </li>
    ));

    return (
      <div className="pure-u-1-1">
        <h1>{title}</h1>
        <div className="l-box">
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <label htmlFor="weather">
              <input
                className="pure-input-2-3"
                id="weather"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="search a city weather..."
              />
            </label>
            <button
              className="button-xlarge pure-button"
              type="submit"
              value="submit"
            >
              show weather forecast
            </button>
          </form>
        </div>
        <div className="l-box">
          <ul>
            {!this.state.loaded ? (
              <div className="loader"> fetching data... </div>
            ) : (
              <div>
                <h2>
                  <span>{cityName}</span>
                  <span> {countryName} </span>
                </h2>
                {list}
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  title: PropTypes.string
};

Weather.defaultProps = {
  city: "london",
  country: "GB",
  title: "weather app"
};

export default Weather;
