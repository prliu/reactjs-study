import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// From there, we are testing Redux library
import { createStore } from "redux";
import { Container } from "react-bootstrap";

import MWHeaderForm from "./components/mw-header-form";
import HelloWorld from "./data-grid";

const CLICK_EXPAND_BTN = "CLICK_EXPAND_BTN";
const FORM_CHANGE = "VALUE_CHANGE";

// Store structure.
const initialState = {
  sid: "0050",
  sname: "台灣50",
  period: "W",
  displayForm: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLICK_EXPAND_BTN:
      return { ...state, ...payload };

    case FORM_CHANGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

const store = createStore(reducer);
// End of the test.

class App extends React.Component {
  handleFormChange(payload) {
    store.dispatch({
      type: FORM_CHANGE,
      payload: payload
    });
  }

  render() {
    return (
      <Container>
        <MWHeaderForm />
        <br />
        <HelloWorld />
      </Container>
    );
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

store.subscribe(render);
render();
