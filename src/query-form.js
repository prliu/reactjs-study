import React from "react";
import axios from "axios";
import { Form, Icon, Segment } from "semantic-ui-react";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker, SingleDatePicker } from "react-dates";

const options = [
  { key: "D", text: "Daily", value: "D" },
  { key: "W", text: "Weekly", value: "W" },
  { key: "M", text: "Monthly", value: "M" }
];

class QueryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: props.visible };
  }

  sendQuery = () => {
    axios
      .get("https://27effcad.ngrok.io/brokers/")
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  render() {
    if (!this.state.visible) {
      return null;
    } else
      return (
        <Segment floated="right">
          <Form>
            <Form.Group widths="equal">
              <Form.Input label="Stock Id" placeholder="Stock Id" />
              <Form.Select
                label="Period"
                selectedLabel="W"
                options={options}
                placeholder="Period"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Start Date</label>
                <SingleDatePicker />
              </Form.Field>
              <Form.Field>
                <label>End Date</label>
                <SingleDatePicker />
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Button primary onClick={this.sendQuery}>
                <Icon name="play circle" />
                Query
              </Form.Button>
              <Form.Button>Clear</Form.Button>
              <Form.Button right floated>
                <Icon name="calculator" />
                Calculate Period
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      );
  }
}

export default QueryForm;
