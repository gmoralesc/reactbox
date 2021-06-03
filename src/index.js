import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const root = document.getElementById("app");

// Functional component
const Item = ({ title, subtitle }) => {
  return (
    <span>
      {title} - {subtitle}
    </span>
  );
};

const Player = ({ data = [], index = -1 }) => {
  return (
    <div>
      {index === -1 ? (
        <Item title="Untitled" subtitle="Unknown" />
      ) : (
        <Item title={data[index].song} subtitle={data[index].artist} />
      )}
    </div>
  );
};

const Controls = ({ prev, shuffle, next }) => {
  return (
    <div>
      <button onClick={prev}>Previous</button>
      <button onClick={shuffle}>Shuffle</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

// Container component
class App extends React.Component {
  state = {
    data: [
      {
        song: "Smells Like Teen Spirit",
        artist: "Nirvana"
      },
      {
        song: "Blind",
        artist: "KoRn"
      },
      {
        song: "Nookie",
        artist: "Limp Bizkit"
      }
    ],
    index: -1
  };

  shuffle = () => {
    const { data } = this.state;

    this.setState({
      index: Math.floor(Math.random() * data.length)
    });
  };

  next = () => {
    const { data } = this.state;
    this.setState((prevState) => {
      return {
        index: (prevState.index + 1) % data.length
      };
    });
  };

  prev = () => {
    const { data } = this.state;
    this.setState((prevState) => {
      return {
        index: prevState.index - 1 < 0 ? data.length - 1 : prevState.index - 1
      };
    });
  };

  play = ({ nextIndex }) => {
    this.setState({
      index: nextIndex
    });
  };

  render() {
    const { data, index } = this.state;

    return (
      <>
        <Player data={data} index={index} />
        <Controls prev={this.prev} shuffle={this.shuflle} next={this.next} />
        <ul>
          {data.map((element, i) => (
            <li
              key={i}
              onClick={() => {
                this.play({ nextIndex: i });
              }}
              className={index === i ? "selected" : ""}
            >
              <Item title={element.song} subtitle={element.artist} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ReactDOM.render(<App />, root);
