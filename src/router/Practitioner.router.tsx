import { Route, Routes } from "react-router-dom";
import PractitionerDetail from "../components/PractitionerDetail";
import PractitionerDetailForm from "../components/PractitionerDetailForm";
import PractitionerList from "../components/PractitionerList";

const PractitionerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PractitionerList />} />
      <Route path="/:id" element={<PractitionerDetail />} />
      <Route path="/edit" element={<PractitionerDetailForm />} />
      <Route path="/new" element={<PractitionerDetailForm />} />
    </Routes>
  );
};

export default PractitionerRouter;
