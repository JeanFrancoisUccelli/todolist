import React from "react";
import cn from "classnames";
import "./style.css";
import Arrowicon from "../../images/arrowicon";

export default class TaskAdd extends React.PureComponent {
  state = {
    isOpen: false,
    value: "",
  };

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "", isOpen: false });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <div className={cn("add", { active: isOpen })} onClick={this.onClick}>
          {isOpen ? <Arrowicon /> : "Add"}
        </div>
        {isOpen && (
          <form className="formAdd" onSubmit={this.onSubmit}>
            <input
              type="text"
              value1={this.state.value}
              onChange={this.handleChange}
              placeholder="Add item"
            />
            <button>Add</button>
          </form>
        )}
      </div>
    );
  }
}
