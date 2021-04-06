import "./styles/App.css";
import { Todo } from "./pages/Todo";
import { UserAccount } from "./pages/UserAccount";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/todo">
        <Todo />
      </Route>
      <Route path="/account">
        <UserAccount />
      </Route>
    </Router>
  );
}

export default App;
