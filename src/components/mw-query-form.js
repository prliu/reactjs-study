import React from "react";
import { Button, ButtonToolbar, Card, Row, Col, Form } from "react-bootstrap";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

class QueryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sid: props.sid === undefined ? "" : props.sid,
      period: props.period === undefined ? "W" : props.period,
      formOpen: false
    };

    this.handleSidChange = this.handleSidChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleOKClick = this.handleOKClick.bind(this);
  }

  handleSidChange(event) {
    this.setState({
      sid: event.target.value
    });
  }

  handlePeriodChange(event) {
    this.setState({
      period: event.target.value
    });
  }

  handleOKClick = () => {
    if (this.props.onChange !== undefined) {
      this.props.onChange({
        sid: this.state.sid,
        period: this.state.period
      });
    }
  };

  render() {
    if (!this.props.visible) {
      return "";
    }

    return (
      <Card>
        <Card.Header>SEARCH</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Control
                placeholder="Stock Id"
                value={this.state.sid}
                onChange={this.handleSidChange}
              />
            </Col>
            <Col>
              <Form.Group controlId="period">
                <Form.Control
                  as="select"
                  onChange={this.handlePeriodChange}
                  value={this.state.period}
                >
                  <option value="D">Daily</option>
                  <option value="W">Weekly</option>
                  <option value="M">Monthly</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* 缺少部份參數的初始化設定，功能不正常 */}
              <SingleDatePicker placeholder="Start Date" />
            </Col>
            <Col>
              {/* 缺少部份參數的初始化設定，功能不正常 */}
              <SingleDatePicker placeholder="End Date" />
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonToolbar>
                <Button
                  variant="primary"
                  ref="form:btnOK"
                  id="form:btnOK"
                  onClick={this.handleOKClick}
                >
                  OK
                </Button>
                <Button variant="light" ref="form:btnClear">
                  Clear
                </Button>
                <Button variant="light" ref="form:btnRecalc">
                  Recalculate
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default QueryForm;
