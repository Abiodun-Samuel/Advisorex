import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [advice, setAdvice] = useState("");
  var [next, setNext] = useState(0);
  const [searchedAdvice, setsearchedAdvice] = useState("");
  const [query, setQuery] = useState("");
  var err = () => {
    return (
      <p className="text-danger">
        Error: Please check your network connection!!!
      </p>
    );
  };

  useEffect(() => {
    fetchAdvice();
    searchAdvice();
    document.title = "AdviceRex";
  }, []);

  const searchAdvice = () => {
    // console.log(query);
    axios
      .get(`https://api.adviceslip.com/advice/search/${query}`)
      .then((res) => {
        const dvice = res.data.slips[next].advice;
        // console.log(
        //   !res.data.message ? res.data.slips[0].advice : res.data.message.text
        // );
        setsearchedAdvice(!res.data.message ? dvice : res.data.message.text);
      })
      .catch((err) => {
        console.log(err);
        setsearchedAdvice("No advice available!!!");
      });
  };

  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice);
        // console.log("changed");
      })
      .catch((error) => {
        setAdvice(err);
        // console.log(error);
      });
  };

  const clear = () => {
    setNext(0);
    setQuery("");
    setsearchedAdvice("");
  };

  return (
    <div className="home">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 d-flex flex-column mt-4">
            <div className="advice text-center" style={{ height: "200px" }}>
              <h2 className="heading">{advice}</h2>
            </div>
            <button className="btn btn-primary" onClick={fetchAdvice}>
              <span> Get Advice</span>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container py-2 mt-4">
        <h4 className="text-light">Seek for Advice</h4>
        <div className="row">
          <div className="col-lg-6">
            <input
              type="text"
              name="query"
              value={query}
              className="form-control my-2"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-success my-2"
              onClick={() => {
                searchAdvice();
                setNext(next + 1);
              }}
            >
              Search
            </button>
            <button className="btn btn-danger my-2 mx-2" onClick={clear}>
              Clear
            </button>
            <button
              className="btn btn-primary my-2 mx-2"
              onClick={() => {
                setNext(next + 1);
                searchAdvice();
              }}
            >
              <span> Next</span>
            </button>
          </div>
          <div className="col-lg-6 bg-transparent">
            <h2>{searchedAdvice}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
