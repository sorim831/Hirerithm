import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CorporateImage from "../src/Pages/RecommendPages/CorporateImage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Corporate-Image-Recommend" element={<CorporateImage />} />
      </Routes>
    </Router>
  );
};

export default App;
