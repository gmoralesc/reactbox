import React from "react";
import { Item } from "./Item";

export const List = (props) => {
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
