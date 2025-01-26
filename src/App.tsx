import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Blogs from "./pages/Blogs/Blogs";
import Blog from "./pages/Blog/Blog";
import Advisiable from "./pages/Advisiable/Advisiable";
import Home from "./pages/Home/Home";
import { VideoProvider } from "./context/MainVideo";
import Product from "./pages/Product/Product";
import LoginScreen from "./pages/login/Login";
import OTPInput from "./pages/OtpVerification/OtpVerification";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <VideoProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advisiable" element={<Advisiable />} />
            <Route path="/product" element={<Product />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/otp" element={<OTPInput />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainLayout>
      </VideoProvider>
    </Router>
  );
}

export default App;
