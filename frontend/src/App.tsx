import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import AppLayout from "./layouts/AppLayout";
import MenusGlobale from "./pages/MenusGlobale";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/menus" element={<MenusGlobale />} />
            <Route path="/mentions" element={<MentionsLegales />} />
            <Route path="/conditions" element={<ConditionsGenerales />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
