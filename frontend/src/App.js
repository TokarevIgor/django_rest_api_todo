import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/userList";
import TodoList from "./components/todoList";
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
              <Link to="/todos">Todos</Link>
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
              element={<ProjectList projects={this.state.projects} />}
            />
            <Route
              path="/project/:id"
              element={<ProjectTodoList todos={this.state.todos} />}
            />
            <Route
              exact
              path="/todos"
              element={<TodoList todos={this.state.todos} />}
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
