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

const element = (
  <>
    <Item title="Smells Like Teen Spirit" subtitle={<strong>Nirvana</strong>} />
    <br />
    <Item title="Nookie" subtitle="Limp Bizkit" />
  </>
);

ReactDOM.render(element, root);
