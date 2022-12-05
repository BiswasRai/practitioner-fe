import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/Signup";
import PractitionerRouter from "./Practitioner.router";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/practitioner/*" element={<PractitionerRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
