import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkBanner = () => {
      const consent = localStorage.getItem('cookieConsent');
      const currentPath = window.location.pathname;
      
      // Mostra banner solo se: sulla home E nessun consenso dato
      if ((currentPath === '/' || currentPath === '/home') && !consent) {
        sessionStorage.removeItem('readingPolicy');
        setShowBanner(true);
      }
    };

    // Controlla all'avvio
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      loadAnalytics();
    }
    
    checkBanner();

    // Controlla periodicamente (per navigazione interna)
    const intervalId = setInterval(checkBanner, 500);

    return () => clearInterval(intervalId);
  }, []);

	const loadAnalytics = () => {
		const currentPath = window.location.pathname;
		const gaPages = ['/', '/home', '/register', '/login', '/terms', '/support', '/about-us', '/suggestions'];
		
		// Carica GA SOLO su pagine pubbliche
		if (!gaPages.includes(currentPath)) {
			return;
		}
		
		const script = document.createElement('script');
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z59GQLLBRW';
		script.async = true;
		document.head.appendChild(script);
		
		window.dataLayer = window.dataLayer || [];
		function gtag(){window.dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-Z59GQLLBRW');
	};

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    sessionStorage.removeItem('readingPolicy');
    setShowBanner(false);
    loadAnalytics();
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    sessionStorage.removeItem('readingPolicy');
    setShowBanner(false);
  };

  const handlePolicyClick = () => {
    sessionStorage.setItem('readingPolicy', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

	return (
	<>
		{/* Overlay */}
		<div style={{
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, 0.7)',
		backdropFilter: 'blur(8px)',
		zIndex: 9998
		}} />
		
		{/* Popup CENTRATO */}
		<div style={{
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(88, 28, 135, 0.95))',
		backdropFilter: 'blur(20px)',
		color: 'white',
		padding: '28px',
		borderRadius: '20px',
		maxWidth: '420px',
		width: '90%',
		zIndex: 9999,
		boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)',
		border: '1px solid rgba(168, 85, 247, 0.3)'
		}}>
		{/* Logo + Titolo (verticale) */}
		<div style={{ 
			textAlign: 'center',
			marginBottom: '16px'
		}}>
			<img 
			src="/logo.png" 
			alt="Karaokati" 
			style={{ 
				height: '30px',
				marginBottom: '12px',
				display: 'block',           // ← AGGIUNGI QUESTO
				margin: '0 auto 12px auto', // ← AGGIUNGI QUESTO
				filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.5))'
			}} 
			/>
			<h3 style={{ 
			margin: 0,
			fontSize: '20px', 
			fontWeight: 'bold',
			background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent'
			}}>
			Cookie e Privacy
			</h3>
		</div>
		
		<p style={{ 
			margin: '0 0 20px 0', 
			fontSize: '14px', 
			color: '#d1d5db', 
			lineHeight: '1.6',
			textAlign: 'center'
		}}>
			Usiamo cookie analytics (Google Analytics) per migliorare il servizio. 
			Puoi accettare o rifiutare liberamente.
		</p>
		
		<div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
			<button onClick={acceptCookies} style={{
			flex: 1,
			background: 'linear-gradient(135deg, #9333ea, #ec4899)',
			color: 'white',
			border: 'none',
			padding: '12px',
			borderRadius: '10px',
			cursor: 'pointer',
			fontSize: '15px',
			fontWeight: '600',
			boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)',
			transition: 'all 0.2s'
			}}>
			✓ Accetta
			</button>
			
			<button onClick={rejectCookies} style={{
			flex: 1,
			background: 'rgba(55, 65, 81, 0.6)',
			color: '#d1d5db',
			border: '1px solid rgba(107, 114, 128, 0.5)',
			padding: '12px',
			borderRadius: '10px',
			cursor: 'pointer',
			fontSize: '15px',
			fontWeight: '600',
			transition: 'all 0.2s'
			}}>
			✕ Rifiuta
			</button>
		</div>
		
		<div style={{ textAlign: 'center' }}>
			<a href="/terms" onClick={handlePolicyClick} style={{ 
			color: '#a78bfa', 
			fontSize: '13px',
			textDecoration: 'underline',
			textUnderlineOffset: '3px'
			}}>
			Leggi la Privacy Policy
			</a>
		</div>
		</div>
	</>
	);
}