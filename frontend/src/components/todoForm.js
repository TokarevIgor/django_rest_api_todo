import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      project: props.projects[0].id,
      user: props.users[0].id,
    };
  }

  handleSubmit(event) {
    this.props.newTodo(this.state.text, this.state.project, this.state.user);
    event.preventDefault();
  }

  handleProjectChange(event) {
    if (!event.target.selectedOptions) {
      return;
    }

    let project = "";
    for (let i = 0; i < event.target.selectedOptions.length; i++) {
      project = parseInt(event.target.selectedOptions.item(i).value);
    }

    this.setState({
      project: project,
    });
  }

  handleTextChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUserChange(event) {
    if (!event.target.selectedOptions) {
      return;
    }

    let user = "";
    for (let i = 0; i < event.target.selectedOptions.length; i++) {
      user = parseInt(event.target.selectedOptions.item(i).value);
    }

    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label for="text">Заметка </label>
          <input
            type="text"
            className="form-control"
            name="text"
            placeholder="text"
            onChange={(event) => this.handleTextChange(event)}
            value={this.state.text}
          />
        </div>
        <div className="form-group">
          <label for="project">Проект </label>
          <select
            name="project"
            onChange={(event) => this.handleProjectChange(event)}
          >
            {this.props.projects.map((project) => (
              <option value={project.id}>{project.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label for="project">Автор </label>
          <select onChange={(event) => this.handleUserChange(event)}>
            {this.props.users.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="Create" />
      </form>
    );
  }
}

export default TodoForm;
