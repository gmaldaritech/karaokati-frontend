
import React from 'react';
import CookieBanner from '../components/CookieBanner';

export default function Layout({ children }) {
    return (
        <div>
            {children}
            <CookieBanner />
        </div>
    )
}