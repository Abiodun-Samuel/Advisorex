import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = { advice: "" };
  componentDidMount() {
    this.fetchAdvice();
  }
  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice: advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { advice } = this.state;
    return (
      <div className="app">
        <div className="card">
          <h2 className="heading">{advice}</h2>
          <button onClick={this.fetchAdvicegit }>
            <span>Advice</span>
          </button>
        </div>
      </div>
    );
  }
}
export default App;
