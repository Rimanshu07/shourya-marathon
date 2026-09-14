import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/registrations`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error, try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        fontFamily: "'Inter', sans-serif",
        padding: '20px'
      }}>
        {/* Glassmorphism Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Logo / Icon Placeholder */}
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #ff4b2b, #ff416c)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 10px 20px rgba(255, 65, 108, 0.4)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
            Admin Secure Access
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>
            Enter your credentials to manage registrations.
          </p>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="admin@shaurya.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff4b2b'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff4b2b'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {loginError && (
              <div style={{ color: '#ff4b2b', fontSize: '13px', marginBottom: '16px', textAlign: 'center', background: 'rgba(255, 75, 43, 0.1)', padding: '10px', borderRadius: '8px' }}>
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoggingIn}
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: 'linear-gradient(135deg, #ff4b2b, #ff416c)',
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                opacity: isLoggingIn ? 0.7 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 16px rgba(255, 65, 108, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onMouseOver={(e) => !isLoggingIn && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !isLoggingIn && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {isLoggingIn ? 'Authenticating...' : 'Secure Login'}
            </button>
            
            <button 
              type="button"
              onClick={() => window.location.hash = ''}
              style={{
                width: '100%',
                marginTop: '16px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '13px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', background: '#f5f5f5', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', color: '#1a1a2e', margin: 0, fontWeight: '700' }}>Registration Audit Dashboard</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => window.location.hash = ''} style={{ padding: '10px 20px', background: '#e0e0e0', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#d0d0d0'} onMouseOut={e=>e.currentTarget.style.background='#e0e0e0'}>
            Home
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#ff416c'} onMouseOut={e=>e.currentTarget.style.background='#1a1a2e'}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <div style={{ color: '#666' }}>Loading registrations...</div>
        </div>
      ) : error ? (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '20px', borderRadius: '12px' }}>
          Error: {error}
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', overflowX: 'auto', border: '1px solid #eaeaea' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID</th>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Runner Details</th>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Info</th>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                <th style={{ padding: '20px', color: '#666', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No registrations found yet.</td>
                </tr>
              ) : (
                registrations.map(reg => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#fafafa'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{ padding: '20px', color: '#1a1a2e', fontWeight: '600' }}>#{reg.id}</td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ color: '#1a1a2e', fontWeight: '600', fontSize: '15px' }}>{reg.name}</div>
                      <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>{reg.city}, {reg.state}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ color: '#333', fontSize: '14px' }}>{reg.email}</div>
                      <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>{reg.phone}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ padding: '6px 12px', background: 'rgba(26, 26, 46, 0.05)', color: '#1a1a2e', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                        {reg.category}
                      </span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        background: reg.payment_status === 'COMPLETED' ? '#e8f5e9' : (reg.payment_status === 'FAILED' ? '#ffebee' : '#fff8e1'), 
                        color: reg.payment_status === 'COMPLETED' ? '#2e7d32' : (reg.payment_status === 'FAILED' ? '#c62828' : '#f57f17'), 
                        borderRadius: '20px', fontSize: '12px', fontWeight: '700' 
                      }}>
                        {reg.payment_status || 'PENDING'}
                      </span>
                    </td>
                    <td style={{ padding: '20px', fontSize: '14px', color: '#666' }}>
                      {new Date(reg.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
