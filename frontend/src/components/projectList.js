import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, deleteProject }) => {
  return (
    <tr>
      <Link to={`/project/${project.id}`}>{project.title}</Link>
      <td>{project.users}</td>
      <td>
        <button onClick={() => deleteProject(project.id)} type="button">
          Delete
        </button>
      </td>
    </tr>
  );
};

const ProjectList = ({ projects, deleteProject }) => {
  return (
    <table>
      <th>Title</th>
      <th>Users</th>
      <th></th>
      {projects.map((project) => (
        <ProjectItem project={project} deleteProject={deleteProject} />
      ))}
    </table>
  );
};

export default ProjectList;
