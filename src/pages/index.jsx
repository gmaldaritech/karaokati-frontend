import Layout from "./Layout.jsx";

import Home from "./Home";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Access from "./Access";
import ChatbotUser from "./ChatbotUser";
import TermsOfService from "./TermsOfService";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import QREntry from "./QREntry";
import QRAccessDenied from "./QRAccessDenied";
import Support from "./Support";
import Suggestions from "./Suggestions.jsx";
import AboutUs from "./AboutUs.jsx"

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    Home: Home,
    home: Home,
    register: Register,
    "dj-dashboard": Dashboard,
    login: Access,
    terms: TermsOfService,
    support: Support,
    "forgot-password": ForgotPassword,
    "verify-email": VerifyEmail,
    "reset-password": ResetPassword,
    ChatbotUser: ChatbotUser,
    QREntry: QREntry,
    QRAccessDenied: QRAccessDenied,
    suggestions: Suggestions,
    "about-us": AboutUs,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dj-dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Access />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/support" element={<Support />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/sessions/entry/:qrCodeId" element={<QREntry />} />
                <Route path="/chat/:sessionId" element={<ChatbotUser />} />
                <Route path="/qr-error/:type/:qrCodeId?" element={<QRAccessDenied />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}