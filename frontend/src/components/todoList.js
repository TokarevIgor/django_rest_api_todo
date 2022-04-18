import React from "react";

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

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <table>
      <th> Проект </th>
      <th> Пользователь </th>
      <th> Заметка </th>
      <th> Активная </th>
      <th></th>
      {todos.map((todos) => (
        <TodoItem todo={todos} deleteTodo={deleteTodo} />
      ))}
    </table>
  );
};

export default TodoList;
