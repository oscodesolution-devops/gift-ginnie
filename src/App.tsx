import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
