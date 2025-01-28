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
import { AuthProvider } from "./context/Auth";
import { AddToCart } from "./context/AddToCart";
import CartPage from "./pages/Cart/Cart";
import Favourites from "./pages/Favourites/Favourites";
import AddressForm from "./pages/Address/Address";
import Order from "./pages/Order/Order";
import { ProtectedRoute } from "./context/ProtectedRoutes";
import UserProfile from "./pages/Profile/Profile";
import ProfileForm from "./pages/ProfileUpdate/ProfileUpdate";

function App() {
  return (
    <AuthProvider>
      <AddToCart>
        <Router>
          <ScrollToTop />
          <VideoProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Advisiable />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-profile"
                  element={
                    <ProtectedRoute>
                      <ProfileForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <ProtectedRoute>
                      <Favourites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/address"
                  element={
                    <ProtectedRoute>
                      <AddressForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <ProtectedRoute>
                      <Order />
                    </ProtectedRoute>
                  }
                />
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
      </AddToCart>
    </AuthProvider>
  );
}

export default App;
