import React from "react";
import ReactDOM from "react-dom";

import { Form } from "./form";

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
    <div className="current-play b-black g-color">
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
    <div className="control">
      <button onClick={prev}>
        <i className="fas fa-backward"></i>
      </button>
      <button onClick={shuffle}>Shuffle</button>
      <button onClick={prev}>
        <i className="fas fa-play"></i>
      </button>
      <button onClick={next}>
        <i className="fa fa-forward"></i>
      </button>
    </div>
  );
};

const List = (props) => {
  const { onSelect, selected = -1, list = [] } = props;
  return (
    <div className="list b-black">
      <ul>
        {list.map((element, i) => (
          <li
            key={i}
            onClick={() => {
              onSelect({ nextIndex: i });
            }}
            className={selected === i ? "playing" : ""}
          >
            <Item title={element.song} subtitle={element.artist} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Panel = ({ children, title, wrapperClass }) => {
  return (
    <div className={`main-ui ${wrapperClass}`}>
      <header>
        <div className="line" />
        <h1>{title}</h1>
      </header>
      <div className="inner">{children}</div>
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
    // 1. Acceder a los props
    // 2. Declarar variables
    // 3. Inicializar el estado con o sin props

    // NO utilizar setState
    // No Ajax
  }

  componentDidMount() {
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
          song,
          artist
        }
      ]
    });
  };

  render() {
    const { data, index } = this.state;
    // NO setState
    // No Ajax

    return (
      <>
        <Panel title="ReactBox" wrapperClass="player">
          <Player data={data} index={index} />
          <Controls prev={this.prev} shuffle={this.shuffle} next={this.next} />
        </Panel>
        <Panel title="List" wrapperClass="list">
          <List list={data} selected={index} onSelect={this.play} />
          <Form add={this.add} remove={this.remove} />
        </Panel>
      </>
    );
  }
}

ReactDOM.render(<App index={-1} />, root);
