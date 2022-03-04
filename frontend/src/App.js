import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/userList";
import TodoList from "./components/todoList";
import ProjectList from "./components/projectList";
import ProjectTodoList from "./components/projectTodoList";
import Menu from "./components/menu.js";
import Footer from "./components/footer.js";
import axios from "axios";
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
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        const users = response.data.results;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/project")
      .then((response) => {
        const projects = response.data.results;
        this.setState({
          projects: projects,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/todo")
      .then((response) => {
        const todos = response.data.results;
        this.setState({
          todos: todos,
        });
      })
      .catch((error) => console.log(error));
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
