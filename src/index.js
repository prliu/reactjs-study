import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  Button,
  Container,
  Divider,
  Header,
  Message,
  Form,
  Field,
  Label
} from "semantic-ui-react";

import "./styles.css";

import QueryForm from "./query-form";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Divider hidden />
        <Header as="h1" dividing>
          Major Weight of Stocks
        </Header>

        <QueryForm />

        <Message
          header="TODO"
          content="How about the start and end date??"
          warning
        />
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
