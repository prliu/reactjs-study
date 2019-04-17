import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  Container,
  Divider,
  Header,
  Message,
  Segment,
  Button,
  Icon
} from "semantic-ui-react";

import "./styles.css";

import QueryForm from "./query-form";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: true, sid: 6176, sname: "瑞儀" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      isClicked: !state.isClicked
    }));
  };

  render() {
    var obj = this.state.isClicked ? <QueryForm visible={true} /> : null;

    return (
      <Container>
        <Divider hidden />
        <Message>
          <Message.Header>
            {this.state.sname} ({this.state.sid})
            <Button icon floated="right" size="mini" onClick={this.handleClick}>
              {this.state.isClicked ? (
                <Icon name="angle double down" />
              ) : (
                <Icon name="angle double up" />
              )}
            </Button>
          </Message.Header>

          <p>This is a simple message</p>
        </Message>

        {obj}
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
