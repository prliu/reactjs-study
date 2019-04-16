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
import "semantic-ui-css/semantic.min.css";
import QueryForm from "./query-form";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Divider hidden />
          <Header as="h1" dividing>
            Major Weight
          </Header>

          <Fragment>
            <Message info>
              <p>Major Weight</p>
            </Message>
          </Fragment>

          <QueryForm />
        </Container>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
