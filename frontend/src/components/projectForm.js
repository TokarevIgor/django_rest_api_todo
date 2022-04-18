import React from "react";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      users: [],
    };
  }

  handleSubmit(event) {
    this.props.newProject(this.state.title, this.state.users);
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUserChange(event) {
    if (!event.target.selectedOptions) {
      return;
    }

    let users = [];
    for (let i = 0; i < event.target.selectedOptions.length; i++) {
      users.push(parseInt(event.target.selectedOptions.item(i).value));
    }

    this.setState({
      users: users,
    });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label for="project">Название </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(event) => this.handleTitleChange(event)}
            value={this.state.text}
          />
        </div>
        <div className="form-group">
          <label for="project">Участники </label>
          <select multiple onChange={(event) => this.handleUserChange(event)}>
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

export default ProjectForm;
