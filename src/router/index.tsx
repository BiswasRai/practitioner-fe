import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login";
import NotFound from "../components/NotFound";
import SignUp from "../components/Signup";
import { getAccessToken } from "../utils/localStorage";
import PractitionerRouter from "./Practitioner.router";
import ProtectedRoute from "./protected.router";

function Router() {
  const accessToken = getAccessToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/practitioner/*" element={<PractitionerRouter />} />
        </Route>

        <Route
          path="/"
          element={
            accessToken ? (
              <PractitionerRouter />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
