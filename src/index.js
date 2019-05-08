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
      period: "w"
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
    const { sid, period } = this.state;

    return (
      <div style={{ padding: "25px" }}>
        <InfoForm sid={sid} onChange={this.handleFormChange} />
        <br />
        {sid !== "" ? <DataTable sid={sid} period={period} /> : ""}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
