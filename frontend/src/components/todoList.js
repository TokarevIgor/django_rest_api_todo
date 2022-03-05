import React from "react";

const TodoItem = ({ todo }) => {
  return (
    <tr>
      <td> {todo.project} </td>
      <td> {todo.user} </td>
      <td> {todo.text} </td>
      <td> {todo.isActive} </td>
    </tr>
  );
};

const TodoList = ({ todos }) => {
  return (
    <table>
      <th> Проект </th>
      <th> Пользователь </th>
      <th> Заметка </th>
      <th> Активная </th>
      {todos.map((todos) => (
        <TodoItem todo={todos} />
      ))}
    </table>
  );
};

export default TodoList;
