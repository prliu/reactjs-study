import React from "react";
import { Form } from "react-bootstrap";

class InfoForm extends React.Component {
  constructor(props) {
    super(props);

    const { sid, onChange } = props;

    this.funcCallback = onChange;

    this.state = {
      sid: sid,
      period: "W"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleCleanClicked = this.handleCleanClicked.bind(this);
    this.handleQueryClicked = this.handleQueryClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      sid: event.target.value
    });
  }

  handlePeriodChange(event) {
    this.setState({
      period: event.target.value
    });
  }

  handleCleanClicked() {
    this.setState({
      sid: ""
    });
  }

  handleQueryClicked() {
    if (this.funcCallback !== undefined) {
      this.funcCallback({ ...this.state });
    }
  }

  render() {
    return (
      <div>
        <Form inline>
          <Form.Control
            value={this.state.sid}
            onChange={this.handleChange}
            placeholder={"Stock Id"}
            maxLength={6}
          />
          <Form.Control
            as="select"
            value={this.state.period}
            onChange={this.handlePeriodChange}
          >
            <option value="D">Daily</option>
            <option value="W">Weekly</option>
            <option value="M">Monthly</option>
          </Form.Control>
        </Form>
        <div style={{ marginTop: "5px" }}>
          <button {...style.btnPrimary} onClick={this.handleQueryClicked}>
            Query
          </button>
          <button {...style.btnLight} onClick={this.handleCleanClicked}>
            Clean
          </button>
          <button {...style.btnLight}>Recalculate</button>
        </div>
      </div>
    );
  }
}

const style = {
  btnPrimary: {
    className: "btn btn-primary",
    style: { marginLeft: "2px", marginRight: "2px" }
  },
  btnLight: {
    className: "btn btn-light",
    style: {
      marginLeft: "2px",
      marginRight: "2px"
    }
  }
};

export default InfoForm;
