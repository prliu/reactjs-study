import React from "react";

import { Form } from "semantic-ui-react";

const options = [
  { key: "D", text: "Day", value: "D" },
  { key: "W", text: "Weekly", value: "W" },
  { key: "M", text: "Monthly", value: "M" }
];

class QueryForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input label="Stock Id" placeholder="Stock Id" />
          <Form.Select
            fluid
            label="Period"
            options={options}
            placeholder="Period"
          />
        </Form.Group>
      </Form>
    );
  }
}

export default QueryForm;
