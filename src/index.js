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
    index: 0
  };

  render() {
    const { data, index } = this.state;

    return (
      <>
        <Item title={data[index].song} subtitle={data[index].artist} />
        <br />
        <button
          onClick={() => {
            this.setState({
              index: Math.floor(Math.random() * data.length)
            });
          }}
        >
          Shuffle
        </button>
      </>
    );
  }
}

ReactDOM.render(<App />, root);
