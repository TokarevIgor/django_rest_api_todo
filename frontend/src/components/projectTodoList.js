import React from "react";
import { useParams } from "react-router-dom";

const TodoItem = ({ todo }) => {
  return (
    <tr>
      <td> {todo.user} </td>
      <td> {todo.text} </td>
      <td> {todo.isActive} </td>
    </tr>
  );
};

const ProjectTodoList = ({ todos }) => {
  var { id } = useParams();
  var filteredTodos = todos.filter((todo) => (todo.project = parseInt(id)));

  return (
    (<h1> Заметки проекта</h1>),
    (
      <table>
        <th> Пользователь </th>
        <th> Заметка </th>
        <th> Активная </th>
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </table>
    )
  );
};

export default ProjectTodoList;
