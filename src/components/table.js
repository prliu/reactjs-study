import React from "react";
import Pagination from "./page";
import Record from "./record";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      page: 0,
      pageSize: 15,
      loading: false,
      data: {
        rows: [[]],
        columns: []
      }
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  fetchData(sid, period) {
    let host = "http://192.168.0.100:8000";
    let query =
      "/api/btick?sid=" +
      sid +
      "&sdate=2018-12-07&edate=2019-05-07&period=" +
      period;

    this.setState({ loading: true });

    if (sid !== "") {
      fetch(host + query)
        .then(resp => resp.json())
        .then(data => {
          console.log("table.fetchData:" + sid);
          this.setState({ data, loading: false });
        })
        .catch(() => this.setState({ loading: false }));
    }
  }

  componentDidMount() {
    let { sid, period } = this.state;

    this.fetchData(sid, period);
  }

  componentDidUpdate(prevProps, prevState) {
    let prevSid = prevProps.sid;
    let prevPeriod = prevProps.period;
    let { sid, period } = this.props;

    if (prevSid !== sid || prevPeriod !== period) {
      this.fetchData(sid, period);
    }
  }

  handlePageChange(page) {
    this.setState({ page: page });
  }

  render() {
    let page = this.state.page;
    let pageSize = this.state.pageSize;
    let { rows, columns } = this.state.data;

    let sloc = page * pageSize + 2;
    let eloc = (page + 1) * pageSize + 2;

    return (
      <div>
        <div style={this.state.loading ? style.overlay : style.hide}>
          <i
            className="fas fa-spinner fa-spin"
            style={{ position: "fixed", top: "40%", left: "45%" }}
          />
        </div>
        <div style={style.tabel}>
          <table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>No.</th>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 2).map((row, idx) => (
                <Record key={idx} data={row} />
              ))}
              {rows.slice(sloc, eloc).map((row, idx) => (
                <Record key={idx} data={row} idx={page * pageSize + idx} />
              ))}
            </tbody>
          </table>
        </div>
        <div style={style.pagination}>
          <Pagination
            count={rows.length - 2}
            page={page}
            pageSize={pageSize}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const style = {
  hide: {
    display: "none"
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    fontSize: "54px"
  },
  tabel: {
    width: "100%",
    overflowX: "scroll",
    overflowY: "visible"
  },
  pagination: {
    marginTop: "10px"
  }
};
export default DataTable;
