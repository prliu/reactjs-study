import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class InfoForm extends React.Component {
  constructor(props) {
    super(props);

    const { sid, onChange } = props;

    this.funcCallback = onChange;

    let edate = new Date();
    let sdate = new Date(edate.getFullYear(), edate.getMonth()-6, edate.getDate());

    this.state = {
      sid: sid,
      period: "W",
      startDate: sdate,
      endDate: edate,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleCleanClicked = this.handleCleanClicked.bind(this);
    this.handleRecalcClicked = this.handleRecalcClicked.bind(this);
    this.handleQueryClicked = this.handleQueryClicked.bind(this);    
    this.handleSDateChange = this.handleSDateChange.bind(this);
    this.handleEDateChange = this.handleEDateChange.bind(this);
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
    let edate = new Date();
    let sdate = new Date(edate.getFullYear(), edate.getMonth()-6, edate.getDate());

    this.setState({
      sid: "",
      period: "W",
      startDate: sdate,
      endDate: edate
    });
  }

  handleRecalcClicked() {
    let { period, endDate } = this.state;
    let startDate;

    switch(period) {
      case "D":
        startDate = new Date(endDate.getFullYear(), endDate.getMonth()-1, endDate.getDate());
        break;
      case "M":
        startDate = new Date(endDate.getFullYear()-2, endDate.getMonth(), endDate.getDate());
        break;
      default: // period: W
        startDate = new Date(endDate.getFullYear(), endDate.getMonth()-6, endDate.getDate());
    }

    this.setState({
      startDate: startDate,
      endDate: endDate
    })
  }

  handleSDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEDateChange(date) {
    this.setState({
      endDate: date
    })
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
          <Form inline>
          <DatePicker
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dateFormat="yyyy/MM/dd"
            dropDownMode="select"
            selected={this.state.startDate}
            placeholderText="Start Date"
            onChange={this.handleSDateChange}
          />
          <DatePicker
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dateFormat="yyyy/MM/dd"
            dropDownMode="select"
            selected={this.state.endDate}
            placeholderText="End Date"
            onChange={this.handleEDateChange}
            todayButton={"Today"}
          />
        </Form>
        <div style={{ marginTop: "5px" }}>
          <button {...style.btnPrimary} onClick={this.handleQueryClicked}>
            Query
          </button>
          <button {...style.btnLight} onClick={this.handleCleanClicked}>
            Clean
          </button>
          <button {...style.btnLight} onClick={this.handleRecalcClicked}>Recalculate</button>
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
