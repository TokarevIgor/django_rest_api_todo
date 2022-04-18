import React from "react";
import ProjectList from "./projectList";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects,
      projectsResult: [],
      titleSearch: "",
    };
  }

  handleSubmit(event) {
    /* решил сделать локально без запроса на сервер */
    this.setState({
      projectsResult: this.state.projects.filter(
        (project) =>
          project.title.toLowerCase().indexOf(this.state.titleSearch) !== -1
      ),
    });
    event.preventDefault();
  }

  handleTitleSearchChange(event) {
    this.setState({
      [event.target.name]: event.target.value.toLowerCase(),
    });
  }

  render() {
    return [
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label for="titleSearch">Название </label>
          <input
            type="text"
            name="titleSearch"
            placeholder="введите название"
            onChange={(event) => this.handleTitleSearchChange(event)}
            value={this.state.text}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Search" />
      </form>,
      <h1>Результаты поиска</h1>,
      <ProjectList
        projects={this.state.projectsResult}
        deleteProject={(id) => this.props.deleteProject(id)}
      />,
    ];
  }
}

export default ProjectForm;
