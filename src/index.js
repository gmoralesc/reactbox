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
  constructor(args) {
    super(args);
    this.song = React.createRef();
    this.artist = React.createRef();
  }

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
    index: -1,
    showForm: false,
    error: ""
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

  toggleForm = () => {
    this.setState(({ showForm }) => ({ 
      showForm: !showForm,
      error: ""
    }));
  };

  add = (event) => {
    event.preventDefault();
    // const { song, artist } = event.target.elements;
    const { data } = this.state;
    const song = this.song.current.value;
    const artist = this.song.current.value;

    if (!song && !artist) {
      this.setState({
        error: "Song and Artist are required"
      });
      return;
    }

    this.setState(
      {
        data: [
          ...data,
          {
            song,
            artist
          }
        ]
      },
      () => {
        this.toggleForm();
      }
    );
  };

  render() {
    const { data, index, showForm, error } = this.state;

    return (
      <>
        <Player data={data} index={index} />
        <Controls prev={this.prev} shuffle={this.shuffle} next={this.next} />
        <List list={data} selected={index} onSelect={this.play} />
        {showForm ? (
          <form onSubmit={this.add}>
            <input type="text" name="song" ref={this.song} />
            <input type="text" name="artist" ref={this.artist} />
            <button type="submit">Save</button>
            <button onClick={this.toggleForm}>Cancel</button>
          </form>
        ) : (
          <>
            <button onClick={this.toggleForm}>Add</button>
            <button onClick={this.remove}>Remove</button>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }
}

ReactDOM.render(<App />, root);
