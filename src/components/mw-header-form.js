import React from "react";
import { Container } from "react-bootstrap";
import MWHeader from "./mw-header";
import QueryForm from "./mw-query-form";

// Store structure.
const initialState = {
  sid: "0050",
  sname: "台灣50",
  period: "W",
  startDate: "",
  endDate: "",
  displayForm: true
};

/*
 * 這是一個 Container Component，會有狀態來記錄
 * FORM 的開閤狀態，以及 FORM 的內容值。
 */
class MWHeaderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  };

  handleFormChange = payload => {
    this.setState({
      ...payload
    });
  };

  render = () => {
    return (
      <Container>
        <MWHeader
          sid={this.state.sid}
          sname={this.state.sname}
          period={this.state.period}
          onButtonClick={this.handleButtonClick}
        />
        <QueryForm
          sid={this.state.sid}
          period={this.state.period}
          visible={this.state.displayForm}
          onChange={this.handleFormChange}
        />
      </Container>
    );
  };
}

export default MWHeaderForm;
