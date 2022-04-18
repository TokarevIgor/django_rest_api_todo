import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/userList";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import ProjectForm from "./components/projectForm";
import ProjectList from "./components/projectList";
import ProjectTodoList from "./components/projectTodoList";
import Menu from "./components/menu.js";
import LoginForm from "./components/loginForm.js";
import Footer from "./components/footer.js";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

const NotFound = () => {
  let location = useLocation();
  return (
    <div>
      <h1> Page {location.pathname} not found</h1>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todos: [],
      token: "",
    };
  }

  set_token(token) {
    const cookies = new Cookies();
    cookies.set("token", token);
    this.setState({ token: token });
  }

  getData() {
    let headers = this.getHeader();
    axios
      .get("http://127.0.0.1:8000/api/users", headers)
      .then((response) => {
        const users = response.data.results;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/project", headers)
      .then((response) => {
        const projects = response.data.results;
        this.setState({
          projects: projects,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/todo", headers)
      .then((response) => {
        const todos = response.data.results;
        this.setState({
          todos: todos,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.get_token_from_storage();
    this.getData();
  }

  isAuth() {
    return !!this.state.token;
  }

  getHeader() {
    if (this.isAuth()) {
      return {
        Authorization: "Token " + this.state.token,
      };
    }
    return {};
  }

  getToken(login, password) {
    axios
      .post("http://127.0.0.1:8000/api-auth-token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        this.set_token(token);
      })
      .catch((error) => alert("Неверный логин или пароль"));
  }

  logout() {
    this.set_token("");
  }

  get_token_from_storage() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    this.setState({ token: token });
  }

  newProject(title, users) {
    let headers = this.getHeader();
    console.log(title, users);
    axios
      .post(
        "http://127.0.0.1:8000/api/project/",
        { title: title, users: users },
        { headers }
      )
      .then((response) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProject(id) {
    let headers = this.getHeader();
    axios
      .delete(`http://127.0.0.1:8000/api/project/${id}`, { headers })
      .then((response) => {
        this.setState({
          projects: this.state.projects.filter((project) => project.id != id),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newTodo(text, project, user) {
    let headers = this.getHeader();
    console.log(text, project, user);
    axios
      .post(
        "http://127.0.0.1:8000/api/todo/",
        { text: text, project: project, user: user },
        { headers }
      )
      .then((response) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTodo(id) {
    let headers = this.getHeader();
    axios
      .delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers })
      .then((response) => {
        let todo = this.state.todos.find((todo) => todo.id == id);
        todo.isActive = false;
        console.log(todo);
        this.setState({
          todos: this.state.todos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/project/create">New project</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/todo/create">New Todo</Link>
            </li>
            <li>
              {this.isAuth() ? (
                <button onClick={() => this.logout()}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </nav>
          <Routes>
            <Route
              exact
              path="/"
              element={<UserList users={this.state.users} />}
            />
            <Route
              exact
              path="/projects"
              element={
                <ProjectList
                  projects={this.state.projects}
                  deleteProject={(id) => this.deleteProject(id)}
                />
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProjectTodoList
                  todos={this.state.todos}
                  deleteTodo={(id) => this.deleteTodo(id)}
                />
              }
            />
            <Route
              exact
              path="/todos"
              element={
                <TodoList
                  todos={this.state.todos}
                  deleteTodo={(id) => this.deleteTodo(id)}
                />
              }
            />
            <Route
              exact
              path="/todo/create"
              element={
                <TodoForm
                  users={this.state.users}
                  projects={this.state.projects}
                  newTodo={(text, project, user) =>
                    this.newTodo(text, project, user)
                  }
                />
              }
            />
            <Route
              exact
              path="/project/create"
              element={
                <ProjectForm
                  users={this.state.users}
                  newProject={(title, users) => this.newProject(title, users)}
                />
              }
            />
            <Route exact path="/users" element={<Navigate to="/" />} />
            <Route
              exact
              path="/login"
              element={
                <LoginForm
                  getToken={(login, password) => this.getToken(login, password)}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* <Menu menu /> */}
        <Footer footer />
      </div>
    );
  }
}

export default App;
