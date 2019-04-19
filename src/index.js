import React from "react";
import ReactDOM from "react-dom";

import {
  Container,
  Row,
  Col,
  Form,
  ButtonToolbar,
  Button,
  Card,
  Navbar
} from "react-bootstrap";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sid: "0050",
      sname: "台灣50",
      period: "W",
      formOpen: true
    };

    this.handlePeriodChanged = this.handlePeriodChanged.bind(this);
    this.handleOKButton = this.handleOKButton.bind(this);
  }

  handlePeriodChanged(event) {
    this.setState({
      period: event.target.value
    });
  }

  handleOKButton() {
    this.setState({
      formOpen: !this.state.formOpen
    });
  }

  render() {
    var formObj;
    if (this.state.formOpen) {
      formObj = (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="sid">
                  <Form.Label>Stock Id</Form.Label>
                  <Form.Control placeholder="Stock Id" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="period"
                  onChange={this.handlePeriodChanged}
                >
                  <Form.Label>Period</Form.Label>
                  <Form.Control as="select" value={this.state.period}>
                    <option value="D">Daily</option>
                    <option value="W">Weekly</option>
                    <option value="M">Monthly</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonToolbar>
                  <Button variant="primary" onClick={this.handleOKButton}>
                    OK
                  </Button>
                  <Button variant="light">Clear</Button>
                  <Button variant="light">Recalculate</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            {this.state.sname} ({this.state.sid}) - {this.state.period}
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button size="sm" variant="light" onClick={this.handleOKButton}>
              {this.state.formOpen ? "O" : "X"}
            </Button>
          </Navbar.Collapse>
        </Navbar>
        {formObj}

        <br />
        {"new message here."}
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
