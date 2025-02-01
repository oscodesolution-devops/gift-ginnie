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
import OrderSummary from "./pages/Orders/Orders";
import CouponPage from "./pages/Coupons/Coupons";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <AuthProvider>
      <AddToCart>
        <Router>
          <ScrollToTop />
          <VideoProvider>
            <MainLayout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Helmet>
                        <title>Home</title>
                      </Helmet>
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <>
                      <Helmet>
                        <title>Our Products</title>
                      </Helmet>
                      <Advisiable />
                    </>
                  }
                />
                <Route
                  path="/product/:productId"
                  element={
                    <>
                      <Helmet>
                        <title>Product Details</title>
                      </Helmet>
                      <ProtectedRoute>
                        <Product />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/blogs"
                  element={
                    <>
                      <Helmet>
                        <title>Blogs</title>
                      </Helmet>
                      <Blogs />
                    </>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <>
                      <Helmet>
                        <title>Blog</title>
                      </Helmet>
                      <Blog />
                    </>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <Helmet>
                        <title>Contact Us</title>
                      </Helmet>
                      <Contact />
                    </>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <>
                      <Helmet>
                        <title>FAQ</title>
                      </Helmet>
                      <FAQ />
                    </>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <>
                      <Helmet>
                        <title>Your Cart</title>
                      </Helmet>
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <>
                      <Helmet>
                        <title>Your Orders</title>
                      </Helmet>
                      <ProtectedRoute>
                        <OrderSummary />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <Helmet>
                        <title>Your Profile</title>
                      </Helmet>
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/coupons"
                  element={
                    <>
                      <Helmet>
                        <title>Coupons</title>
                      </Helmet>
                      <ProtectedRoute>
                        <CouponPage />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/update-profile"
                  element={
                    <>
                      <Helmet>
                        <title>Update Profile</title>
                      </Helmet>
                      <ProtectedRoute>
                        <ProfileForm />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <>
                      <Helmet>
                        <title>Your Favourites</title>
                      </Helmet>
                      <ProtectedRoute>
                        <Favourites />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/address"
                  element={
                    <>
                      <Helmet>
                        <title>Address Form</title>
                      </Helmet>
                      <ProtectedRoute>
                        <AddressForm />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <>
                      <Helmet>
                        <title>Order Details</title>
                      </Helmet>
                      <ProtectedRoute>
                        <Order />
                      </ProtectedRoute>
                    </>
                  }
                />
                <Route
                  path="/terms-and-conditions"
                  element={
                    <>
                      <Helmet>
                        <title>Terms and Conditions</title>
                      </Helmet>
                      <TermsAndConditions />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <Helmet>
                        <title>Login</title>
                      </Helmet>
                      <LoginScreen />
                    </>
                  }
                />
                <Route
                  path="/otp"
                  element={
                    <>
                      <Helmet>
                        <title>OTP Verification</title>
                      </Helmet>
                      <OTPInput />
                    </>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <>
                      <Helmet>
                        <title>Privacy Policy</title>
                      </Helmet>
                      <PrivacyPolicy />
                    </>
                  }
                />
                <Route
                  path="*"
                  element={
                    <>
                      <Helmet>
                        <title>Page Not Found</title>
                      </Helmet>
                      <PageNotFound />
                    </>
                  }
                />
              </Routes>
            </MainLayout>
          </VideoProvider>
        </Router>
      </AddToCart>
    </AuthProvider>
  );
}

export default App;
