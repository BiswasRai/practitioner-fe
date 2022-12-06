import "./App.less";
import "./App.css";

import Router from "./router";
import { getAccessToken } from "./utils/localStorage";
import { isEmpty } from "./utils/string";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();

  // if (isEmpty(getAccessToken())) {
  //   navigate("/login");
  // }

  return <Router />;
}

export default App;
