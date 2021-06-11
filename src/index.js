import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Panel } from "./components/Panel";
import { Player } from "./components/Player";
import { Controls } from "./components/Controls";
import { List } from "./components/List";
import { Form } from "./containers/Form";

import "./styles.css";

const root = document.getElementById("app");

const ReactBox = ({ defaultIndex = -1 }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(defaultIndex);

  useEffect(() => {
    setData([
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
    ]);
  }, []);

  const shuffle = () => {
    setIndex(Math.floor(Math.random() * data.length));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex - 1 < 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const play = ({ nextIndex }) => {
    setIndex(nextIndex);
  };

  const remove = () => {
    if (index !== -1) {
      setData((prevData) => {
        const filteredData = prevData.filter((item, i) => {
          return i !== index;
        });
        return filteredData;
      });
      setIndex(-1);
    }
  };

  const add = ({ song, artist }) => {
    setData([
      ...data,
      {
        song,
        artist
      }
    ]);
  };

  return (
    <>
      <Panel title="ReactBox" wrapperClass="player">
        <Player data={data} index={index} />
        <Controls prev={prev} shuffle={shuffle} next={next} />
      </Panel>
      <Panel title="List" wrapperClass="list">
        <List list={data} selected={index} onSelect={play} />
        <Form add={add} remove={remove} />
      </Panel>
    </>
  );
};

ReactDOM.render(<ReactBox />, root);
