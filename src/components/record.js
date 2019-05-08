import React from "react";

const Record = ({ data, idx }) => {
  return (
    <tr>
      <td style={{ textAlign: "right" }}>{idx === undefined ? "" : idx + 1}</td>
      <td style={style.rowName}>{data[0]}</td>
      {data.slice(1, data.length).map((col,idx) => (
        <td key={data[0] + "-" + idx} style={col >= 0 ? style.rowPostive : style.rowNegative}>{col}</td>
      ))}
    </tr>
  );
};

const style = {
  rowName: {
    border: "1px black solid",
    minWidth: "12rem",
    textAlign: "left"
  },
  rowPostive: {
    border: "1px black solid",
    minWidth: "5rem",
    textAlign: "right"
  },
  rowNegative: {
    border: "1px black solid",
    minWidth: "5rem",
    textAlign: "right",
    color: "red"
  }
};

export default Record;
