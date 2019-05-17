import React from "react";
import Pagination from "./page";
import Record from "./record";

const ColumnHeader = ({ colName, colIdx, isSort, direction, onChange }) => {

  let sortSign;

  if(isSort) {
    if(direction === "asc") {
      sortSign = <i className={"fas fa-angle-up"}></i>
    } else {
      sortSign = <i className={"fas fa-angle-down"}></i>
    }
  }

  return (
    <th onClick={() => onChange(colIdx)}>{colName} {sortSign}</th>
  );
}

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      page: 0,
      pageSize: 20,
      sortColumn: 1,
      sortDirection: "desc",
      loading: false,
      data: {
        rows: [[]],
        columns: []
      }
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  fetchData(sid, period, startDate, endDate) {
    let sdate = startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate();
    let edate = endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate();
    let host = "http://192.168.0.100:8000";
    let query =
      "/api/btick?sid=" +
      sid +
      "&sdate=" + sdate + "&edate=" + edate+ "&period=" +
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
    console.log(this.state);
    let { sid, period, startDate, endDate } = this.state;
    this.fetchData(sid, period, startDate, endDate);
  }

  componentDidUpdate(prevProps, prevState) {
    let prevSid = prevProps.sid;
    let prevPeriod = prevProps.period;
    let prevSDate = prevProps.startDate;
    let prevEDate = prevProps.endDate;

    let { sid, period, startDate, endDate } = this.props;
    let needUpdate = false;

    needUpdate = prevSid !== sid ? true : false;
    needUpdate |= prevPeriod !== period ? true : false;
    needUpdate |= prevSDate !== startDate ? true : false;
    needUpdate |= prevEDate !== endDate ? true : false;
    
    if (needUpdate) {
      this.fetchData(sid, period, startDate, endDate);
    }
  }

  handlePageChange(page) {
    this.setState({ page: page });
  }

  handleSortChange(colIdx) {
    
    let direction = this.state.sortDirection;
    if (colIdx === this.state.sortColumn) {
      direction = direction === 'desc' ? 'asc' : 'desc';
    }

    // Sorting data.
    let tmp = this.state.data.rows.slice(2, this.state.data.rows.length);
    tmp = tmp.sort((a, b) => {
      if(direction === "asc") {
        return a[colIdx] - b[colIdx];
      } else {
        return b[colIdx] - a[colIdx];
      }
    })
    let data = this.state.data.rows.slice(0, 2).concat(tmp);

    this.setState({
      sortColumn: colIdx,
      sortDirection: direction,
      data:{
        columns: this.state.data.columns,
        rows: data
      }
    });
  }

  render() {

    let {page, pageSize, sortColumn, sortDirection} = this.state;
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
                  <ColumnHeader
                    colName={col}
                    colIdx={idx}
                    {...idx === sortColumn ? { ...{ isSort: true, direction: sortDirection } } : null}
                    onChange={this.handleSortChange}
                  />
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
        <div style={style.pagination} className={"form-inline"}>
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
