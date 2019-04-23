import React from "react";
import { Navbar, Button } from "react-bootstrap";

class MWHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: props.formOpen === undefined ? true : props.formOpen
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });

    if (this.props.onButtonClick !== undefined) {
      this.props.onButtonClick();
    }
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          {this.props.sname} ({this.props.sid}) - {this.props.period}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button
            size="sm"
            variant="light"
            id="header:btnDisplayForm"
            onClick={this.handleClick}
          >
            {this.state.formOpen ? "X" : "O"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MWHeader;
