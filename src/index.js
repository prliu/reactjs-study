import React from "react";
import ReactDOM from "react-dom";

import { Button } from "semantic-ui-react";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Button primary>OK</Button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
