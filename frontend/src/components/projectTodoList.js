import React from "react";
import { useParams } from "react-router-dom";

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <tr>
      <td> {todo.project} </td>
      <td> {todo.user} </td>
      <td> {todo.text} </td>
      <td> {todo.isActive ? "да" : "нет"} </td>
      <td>
        <button onClick={() => deleteTodo(todo.id)} type="button">
          Delete
        </button>
      </td>
    </tr>
  );
};

const ProjectTodoList = ({ todos, deleteTodo }) => {
  let { id } = useParams();
  let filteredTodos = todos.filter((todo) => todo.project == parseInt(id));

  return (
    (<h1> Заметки проекта {id}</h1>),
    (
      <table>
        <th> Проект </th>
        <th> Пользователь </th>
        <th> Заметка </th>
        <th> Активная </th>
        <th></th>
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} deleteTodo={deleteTodo} />
        ))}
      </table>
    )
  );
};

export default ProjectTodoList;
