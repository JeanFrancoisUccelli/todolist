import React from "react";
import Task from "../../components/Task/";
import Search from "../../components/Search/index";
import Filters from "../../components/Filters/index";
import TaskAdd from "../../components/TaskAdd/index";
import "./style.css";

export default class Main extends React.Component {
  state = {
    tasks: [],
    value: "",
    edited: false,
    selected: "all",
  };

  componentDidMount() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      this.setState({ tasks: JSON.parse(tasks) });
    }
  }

  handleCheck = (idx) => {
    const { tasks } = this.state;
    const task = tasks[idx];
    tasks.splice(idx, 1);
    task.check = !task.check;
    task.check ? tasks.push(task) : tasks.unshift(task);
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  saveTask = (value, idx) => {
    const { tasks } = this.state;
    tasks[idx].title = value;
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  deleteTask = (idx) => {
    const newtasks = this.state.tasks;
    newtasks.splice(idx, 1);
    this.setState({ tasks: newtasks });
    localStorage.setItem("tasks", JSON.stringify(newtasks));
  };

  onSearch = (value) => {
    this.setState({ value: value });
  };

  handleSubmit = (title) => {
    const newtask = { id: Date.now(), title: title, check: false };
    const newtasks = [newtask, ...this.state.tasks];
    this.setState({ tasks: newtasks });
    localStorage.setItem("tasks", JSON.stringify(newtasks));
  };

  handleRadio = (name) => {
    this.setState({ selected: name });
  };

  visibleTasks = () => {
    const { tasks, selected } = this.state;
    // eslint-disable-next-line
    let filterState = null;
    switch (selected) {
      case "complete":
        return (filterState = tasks.filter((task) => task.check));
      case "incomplete":
        return (filterState = tasks.filter((task) => !task.check));
      default:
        return (filterState = tasks);
    }
  };

  clearCompleted = () => {
    this.setState({ tasks: this.state.tasks.filter((task) => !task.check) });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  render() {
    const { tasks, value, selected } = this.state;
    const visibleTasks = this.visibleTasks();
    const filteredTasks = visibleTasks.filter(({ title }) =>
      new RegExp(value, "i").test(title)
    );

    return (
      <>
        <h2>TO DO</h2>;
        <div className="wrapper">
          <div className="container">
            <header className="header">
              <h1>Todos</h1>
            </header>
            <div className="app">
              <div className="settings">
                <Search onSearch={this.onSearch} value={this.state.value} />
                <Filters
                  tasks={tasks}
                  selected={selected}
                  handleRadio={this.handleRadio}
                />
              </div>
              <h3>All tasks: {tasks.length}</h3>
              <div className="settings">
                <p>Status</p>
                <p>Title</p>
              </div>
              <div className="list">
                {filteredTasks.map((task, idx) => (
                  <Task
                    task={task}
                    key={idx}
                    idx={idx}
                    id={task.id}
                    check={task.check}
                    handleCheck={this.handleCheck}
                    saveTask={this.saveTask}
                    deleteTask={this.deleteTask}
                    onSubmit={this.saveTask}
                  />
                ))}
              </div>
              <TaskAdd onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
