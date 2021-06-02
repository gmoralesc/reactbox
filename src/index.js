import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("app");

// Functional component
const Item = ({ title, subtitle }) => {
  return (
    <span>
      {title} - {subtitle}
    </span>
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
        {index === -1 ? (
          <Item title="Untitled" subtitle="Unknown" />
        ) : (
          <Item title={data[index].song} subtitle={data[index].artist} />
        )}
        <br />
        <button onClick={this.prev}>Previous</button>
        <button onClick={this.shuffle}>Shuffle</button>
        <button onClick={this.next}>Next</button>
        <ul>
          {data.map((element, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  this.play({ nextIndex: i });
                }}
              >
                Play
              </button>{" "}
              <Item title={element.song} subtitle={element.artist} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ReactDOM.render(<App />, root);
