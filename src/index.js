import React from "react";
import ReactDOM from "react-dom";

import { FormContainer } from "./form";

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

const List = (props) => {
  const { onSelect, selected = -1, list = [] } = props;
  return (
    <div>
      <ul>
        {list.map((element, i) => (
          <li
            key={i}
            onClick={() => {
              onSelect({ nextIndex: i });
            }}
            className={selected === i ? "selected" : ""}
          >
            <Item title={element.song} subtitle={element.artist} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Container component
class App extends React.Component {
  constructor(props) {
    super(props);

    const index = props.index >= 0 ? props.index : -1;

    this.state = {
      data: [],
      index
    };
    console.log("constructor App");
    // 1. Acceder a los props
    // 2. Declarar variables
    // 3. Inicializar el estado con o sin props

    // NO utilizar setState
    // No Ajax
  }

  componentDidMount() {
    console.log("componentDidMount App");
    setTimeout(() => {
      this.setState({
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
        ]
      });
    }, 1000);
    // setState
    // Ajax
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate App");
    console.log({
      prevProps,
      prevState,
      snapshot
    });
    // setState
    // Ajax
  }

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

  remove = () => {
    const { index } = this.state;
    if (index !== -1) {
      this.setState(({ data }) => {
        const filteredData = data.filter((item, i) => {
          return i !== index;
        });
        return {
          data: filteredData,
          index: -1
        };
      });
    }
  };

  add = ({ song, artist }) => {
    const { data } = this.state;
    this.setState({
      data: [
        ...data,
        {
          song: song.value,
          artist: artist.value
        }
      ]
    });
  };

  render() {
    const { data, index } = this.state;
    console.log("render App");
    // NO setState
    // No Ajax

    return (
      <>
        <Player data={data} index={index} />
        <Controls prev={this.prev} shuffle={this.shuffle} next={this.next} />
        <List list={data} selected={index} onSelect={this.play} />
        <FormContainer add={this.add} remove={this.remove} />
      </>
    );
  }
}

ReactDOM.render(<App index={-1} />, root);
