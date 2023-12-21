// App.js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" render={(props) => <HomePage {...props} />} exact />
          <Route path="/chats" render={(props) => <ChatPage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
