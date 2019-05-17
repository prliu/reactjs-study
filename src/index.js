import React from "react";
import ReactDOM from "react-dom";
import InfoForm from "./components/form";
import DataTable from "./components/table";

import "./css/sb-admin-2.min.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sid: "",
      period: "W",
      startDate: new Date(),
      endDate: new Date(),
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleFormChange(argus) {
    this.setState({ ...argus });
  }

  handlePageChange(page) {
    this.setState({ page: page });
  }

  render() {
    const { sid, period, startDate, endDate } = this.state;

    return (
      <div style={{ padding: "10px" }}>
        <InfoForm sid={sid} onChange={this.handleFormChange} />
        <br />
        {sid !== "" ? <DataTable sid={sid} period={period} startDate={startDate} endDate={endDate} /> : ""}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
