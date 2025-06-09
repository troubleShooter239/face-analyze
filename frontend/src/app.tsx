import "./app.css";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import AboutUs from "./pages/about-us";
import TermsOfUse from "./pages/terms-of-use";
import PrivacyPolicy from "./pages/privacy-policy";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<HomePage />} />
        <Route path="/verify" element={<HomePage />} />
        <Route path="/extract-faces" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
