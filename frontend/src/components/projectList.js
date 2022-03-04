import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project }) => {
  return (
    <tr>
      <Link to={`/project/${project.id}`}>{project.title}</Link>
      <td>{project.users}</td>
    </tr>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <table>
      <th>Title</th>
      <th>Users</th>
      {projects.map((projects) => (
        <ProjectItem project={projects} />
      ))}
    </table>
  );
};

export default ProjectList;
