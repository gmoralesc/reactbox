import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("app");

const Item = ({ title, subtitle }) => {
  return (
    <span>
      {title} - {subtitle}
    </span>
  );
};

const state = {
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

function setState(nextState) {
  Object.assign(state, nextState);
  render();
}

function handleEvent(event) {
  setState({
    index: Math.floor(Math.random() * state.data.length)
  });
}

function render() {
  const { data, index } = state;

  const element = (
    <>
      <Item title={data[index].song} subtitle={data[index].artist} />
      <br />
      <button onClick={handleEvent}>Shuffle</button>
    </>
  );

  ReactDOM.render(element, root);
}

render();
