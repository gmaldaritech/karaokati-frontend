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

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Register: Register,
    
    Dashboard: Dashboard,
    
    Access: Access,
    
    ChatbotUser: ChatbotUser,

    QREntry: QREntry,
    
    TermsOfService: TermsOfService,
    
    ForgotPassword: ForgotPassword,
    
    ResetPassword: ResetPassword,

    VerifyEmail: VerifyEmail,

    QRAccessDenied: QRAccessDenied,

    Support: Support,

    Suggestions: Suggestions,
    
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
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Register" element={<Register />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Access" element={<Access />} />
                
                <Route path="/TermsOfService" element={<TermsOfService />} />

                <Route path="/Support" element={<Support />} />
                
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                
                <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
                
                <Route path="/ResetPassword/:token" element={<ResetPassword />} />

                <Route path="/sessions/entry/:qrCodeId" element={<QREntry />} />
                
                <Route path="/chat/:sessionId" element={<ChatbotUser />} />

                <Route path="/qr-error/:type/:qrCodeId?" element={<QRAccessDenied />} />

                <Route path="/Suggestions" element={<Suggestions />} />
                
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