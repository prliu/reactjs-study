import React from "react";

import { Form, Icon } from "semantic-ui-react";

const options = [
  { key: "D", text: "Daily", value: "D" },
  { key: "W", text: "Weekly", value: "W" },
  { key: "M", text: "Monthly", value: "M" }
];

class QueryForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Stock Id" placeholder="Stock Id" />
          <Form.Select
            fluid
            label="Period"
            selectedLabel="W"
            options={options}
            placeholder="Period"
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Button primary>
            <Icon name="play circle" />
            Query
          </Form.Button>
          <Form.Button>Clear</Form.Button>
          <Form.Button>
            <Icon name="calculator" />
            Calculate Period
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default QueryForm;
