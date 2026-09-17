import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Users, DollarSign, Activity, Eye, X,
  LogOut, LayoutDashboard, Image as ImageIcon, FileCheck,
  CheckCircle, XCircle, Clock, Calendar, Phone, MapPin, Mail,
  ShieldCheck, ExternalLink, ChevronRight, ZoomIn
} from 'lucide-react';

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

  // Advanced UI State
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, statusFilter]);

  const [selectedRunner, setSelectedRunner] = useState(null);
  // For lightbox image preview
  const [lightboxImg, setLightboxImg] = useState(null);

  // Helper to format image URLs from absolute paths
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    const filename = filePath.split(/[\/\\]/).pop();
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  };



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
    const token = localStorage.getItem('adminToken');
    if (token) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchRegistrations();
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

  // Global search – recent first (highest ID on top), shown as S.No.
  const filteredRegistrations = useMemo(() => {
    let source = registrations;
    // Only show successful registrations in DASHBOARD and REGISTRATIONS tabs
    if (activeTab === 'DASHBOARD' || activeTab === 'REGISTRATIONS') {
      source = source.filter(r => r.payment_status === 'PAID');
    }
    
    return source
      .filter(reg => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
          (reg.name || '').toLowerCase().includes(q) ||
          (reg.email || '').toLowerCase().includes(q) ||
          (reg.phone || '').includes(searchTerm) ||
          (reg.city || '').toLowerCase().includes(q);
        const matchesStatus = statusFilter === 'ALL' || reg.payment_status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => b.id - a.id); // Recent first (latest registration on top)
  }, [registrations, searchTerm, statusFilter, activeTab]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRegistrations.slice(startIndex, startIndex + itemsPerPage);

  // Derived Stats
  const totalRunners = registrations.filter(r => r.payment_status === 'PAID').length;
  const completedPayments = registrations.filter(r => r.payment_status === 'PAID').length;
  const pendingPayments = registrations.filter(r => r.payment_status === 'PENDING').length;
  const estimatedRevenue = completedPayments * 1100;

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'PAID': return <span className="admin-badge success"><CheckCircle size={14} /> Paid</span>;
      case 'FAILED': return <span className="admin-badge danger"><XCircle size={14} /> Failed</span>;
      default: return <span className="admin-badge warning"><Clock size={14} /> Pending</span>;
    }
  };

  // Inline doc image card
  const DocCard = ({ label, url, icon: Icon }) => {
    const src = url ? getFileUrl(url) : null;
    return (
      <div className="doc-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <strong style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <Icon size={16} /> {label}
        </strong>
        {src ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={src}
              alt={label}
              style={{
                width: '100%',
                maxHeight: 180,
                objectFit: 'cover',
                borderRadius: 10,
                border: '1.5px solid #e0e0e0',
                cursor: 'zoom-in',
                display: 'block'
              }}
              onClick={() => setLightboxImg(src)}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              background: '#f5f5f5',
              borderRadius: 10,
              color: '#888',
              fontSize: 13
            }}>
              Preview unavailable
            </div>
            <button
              onClick={() => setLightboxImg(src)}
              style={{
                position: 'absolute', top: 6, right: 6,
                background: 'rgba(0,0,0,0.55)', border: 'none',
                borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff'
              }}
            >
              <ZoomIn size={14} />
            </button>
          </div>
        ) : (
          <span className="doc-missing">Not uploaded</span>
        )}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon"><ShieldCheck size={32} /></div>
          <h2>Admin Secure Access</h2>
          <p>Enter your credentials to manage registrations.</p>
          <form onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label>Email Address</label>
              <input type="email" placeholder="admin@shaurya.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="admin-input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {loginError && <div className="admin-error-msg">{loginError}</div>}
            <button type="submit" className="admin-btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? 'Authenticating...' : 'Secure Login'}
            </button>
            <button type="button" className="admin-btn-link"
              onClick={() => { window.history.pushState({}, '', '/'); window.location.reload(); }}>
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo" style={{ background: 'transparent', width: 45, height: 45, padding: 0 }}>
            <img src="/logo.png" alt="Shaurya Daur Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h3>Shaurya Daur</h3>
            <span>Admin Portal</span>
          </div>
        </div>
        <nav className="admin-nav">
          <a href="/admin" className={`admin-nav-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('DASHBOARD'); }}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="/admin" className={`admin-nav-item ${activeTab === 'REGISTRATIONS' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('REGISTRATIONS'); }}>
            <Users size={20} /> Registrations
          </a>
          <a href="/admin" className={`admin-nav-item ${activeTab === 'TRANSACTIONS' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('TRANSACTIONS'); }}>
            <Activity size={20} /> Transactions
          </a>
          <div className="admin-nav-divider"></div>
          <a href="/admin" className="admin-nav-item danger"
            onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            <LogOut size={20} /> Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <div>
            <h1 className="admin-page-title">Registrations Overview</h1>
            {/* <p className="admin-page-subtitle">Manage and monitor marathon participants</p> */}
          </div>
          <button className="admin-btn-outline" onClick={() => window.open('/', '_blank')}>
            <ExternalLink size={18} /> View Live Site
          </button>
        </header>

        {/* ── GLOBAL SEARCH BAR ── */}
        <div className="admin-toolbar-mobile">
          <div className="admin-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, phone or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-filters">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #dde', fontSize: 14, background: '#fff', cursor: 'pointer' }}>
              <option value="ALL">All Status</option>
              <option value="PAID">Paid Only</option>
              <option value="PENDING">Pending Only</option>
              <option value="FAILED">Failed Only</option>
            </select>

            {searchTerm && (
              <button onClick={() => setSearchTerm('')}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #dde', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                <X size={14} /> Clear
              </button>
            )}
          </div>
          {searchTerm && (
            <span style={{ fontSize: 13, color: '#888' }}>
              {filteredRegistrations.length} result{filteredRegistrations.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {loading ? (
          <div className="admin-loading-state">
            <div className="admin-spinner"></div>
            <p>Loading registry data...</p>
          </div>
        ) : error ? (
          <div className="admin-error-state">
            <XCircle size={32} />
            <p>Error loading data: {error}</p>
          </div>
        ) : (
          <div className="admin-content-wrapper">

            {/* DASHBOARD TAB */}
            {activeTab === 'DASHBOARD' && (
              <>
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <div className="stat-icon primary"><Users size={24} /></div>
                    <div className="stat-details">
                      <span className="stat-label">Total Registrations</span>
                      <span className="stat-value">{totalRunners}</span>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon success"><CheckCircle size={24} /></div>
                    <div className="stat-details">
                      <span className="stat-label">Successful Payments</span>
                      <span className="stat-value">{completedPayments}</span>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon warning"><Clock size={24} /></div>
                    <div className="stat-details">
                      <span className="stat-label">Pending Payments</span>
                      <span className="stat-value">{pendingPayments}</span>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon special">₹</div>                    <div className="stat-details">
                      <span className="stat-label">Est. Revenue</span>
                      <span className="stat-value">₹{(estimatedRevenue / 1000).toFixed(1)}k+</span>
                    </div>
                  </div>
                </div>

                <div className="admin-table-container">
                  <div className="admin-toolbar" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1a1a2e' }}>
                      {searchTerm ? `Search Results (${filteredRegistrations.length})` : 'Recent Successful Registrations'}
                    </h3>
                    <button className="admin-btn-outline" onClick={() => setActiveTab('REGISTRATIONS')}>
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>S.No.</th><th>Runner Details</th><th>Contact Info</th>
                          <th>Category</th><th>Status</th><th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.length === 0 ? (
                          <tr><td colSpan="6" className="admin-empty-state">No matching records found.</td></tr>
                        ) : (
                          currentData.map((reg, index) => {
                            const actualIdx = startIndex + index + 1;
                            return (
                              <tr key={reg.id}>
                                <td data-label="S.No."><strong>{actualIdx}</strong></td>
                                <td data-label="Runner Details">
                                  <div>
                                    <div className="runner-name">{reg.name}</div>
                                    <div className="runner-loc">{reg.city}, {reg.state}</div>
                                  </div>
                                </td>
                                <td data-label="Contact Info">
                                  <div>
                                    <div className="runner-email">{reg.email}</div>
                                    <div className="runner-phone">{reg.phone}</div>
                                  </div>
                                </td>
                                <td data-label="Category"><span className="admin-category-tag">{(reg.category || '').replace(/_/g, ' ')}</span></td>
                                <td data-label="Status"><StatusBadge status={reg.payment_status} /></td>
                                <td data-label="Action">
                                  <button className="admin-btn-icon" onClick={() => setSelectedRunner(reg)} title="View Details">
                                    <Eye size={18} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination Controls */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '16px', borderTop: '1px solid #eaeaea' }}>
                    <button className="admin-btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                    <span style={{ fontSize: '14px', color: '#555' }}>Page {currentPage} of {totalPages || 1}</span>
                    <button className="admin-btn-outline" disabled={currentPage >= totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                  </div>
                </div>
              </>
            )}

            {/* REGISTRATIONS TAB */}
            {activeTab === 'REGISTRATIONS' && (
              <div className="admin-table-container">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>S.No.</th><th>Runner Details</th><th>Contact Info</th>
                        <th>Category</th><th>Status</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length === 0 ? (
                        <tr><td colSpan="6" className="admin-empty-state">No matching records found.</td></tr>
                      ) : (
                        currentData.map((reg, index) => {
                          const actualIdx = startIndex + index + 1;
                          return (
                            <tr key={reg.id}>
                              <td data-label="S.No."><strong>{actualIdx}</strong></td>
                              <td data-label="Runner Details">
                                <div>
                                  <div className="runner-name">{reg.name}</div>
                                  <div className="runner-loc">{reg.city}, {reg.state}</div>
                                </div>
                              </td>
                              <td data-label="Contact Info">
                                <div>
                                  <div className="runner-email">{reg.email}</div>
                                  <div className="runner-phone">{reg.phone}</div>
                                </div>
                              </td>
                              <td data-label="Category"><span className="admin-category-tag">{(reg.category || '').replace(/_/g, ' ')}</span></td>
                              <td data-label="Status"><StatusBadge status={reg.payment_status} /></td>
                              <td data-label="Action">
                                <button className="admin-btn-icon" onClick={() => setSelectedRunner(reg)} title="View Details">
                                  <Eye size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '16px', borderTop: '1px solid #eaeaea' }}>
                  <button className="admin-btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                  <span style={{ fontSize: '14px', color: '#555' }}>Page {currentPage} of {totalPages || 1}</span>
                  <button className="admin-btn-outline" disabled={currentPage >= totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </div>
              </div>
            )}

            {/* TRANSACTIONS TAB */}
            {activeTab === 'TRANSACTIONS' && (
              <div className="admin-table-container">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>S.No.</th><th>Runner Details</th><th>Order ID / Payment ID</th>
                        <th>Amount</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length === 0 ? (
                        <tr><td colSpan="5" className="admin-empty-state">No matching transactions found.</td></tr>
                      ) : (
                        currentData.map((reg, index) => {
                          const actualIdx = startIndex + index + 1;
                          return (
                            <tr key={reg.id}>
                              <td data-label="S.No."><strong>{actualIdx}</strong></td>
                              <td data-label="Runner Details">
                                <div>
                                  <div className="runner-name">{reg.name}</div>
                                  <div className="runner-phone">{reg.phone}</div>
                                </div>
                              </td>
                              <td data-label="Order ID / Payment ID">
                                <div>
                                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#555' }}>
                                    {reg.razorpay_order_id || 'N/A'}
                                  </div>
                                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--maroon)' }}>
                                    {reg.razorpay_payment_id || ''}
                                  </div>
                                </div>
                              </td>
                              <td data-label="Amount">
                                <strong>₹1100</strong>
                              </td>
                              <td data-label="Status"><StatusBadge status={reg.payment_status} /></td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '16px', borderTop: '1px solid #eaeaea' }}>
                  <button className="admin-btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                  <span style={{ fontSize: '14px', color: '#555' }}>Page {currentPage} of {totalPages || 1}</span>
                  <button className="admin-btn-outline" disabled={currentPage >= totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* ── DETAILS MODAL ── */}
      {selectedRunner && (
        <div className="admin-modal-overlay" onClick={() => setSelectedRunner(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Runner Profile </h2>
              <button className="admin-modal-close" onClick={() => setSelectedRunner(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="modal-profile-header">
                <div className="profile-avatar">{selectedRunner.name.charAt(0).toUpperCase()}</div>
                <div className="profile-info">
                  <h3>{selectedRunner.name}</h3>
                  <p>
                    <StatusBadge status={selectedRunner.payment_status} />
                    {' \u2022 '}Registered on {new Date(selectedRunner.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="modal-details-grid">
                <div className="detail-card">
                  <h4><Users size={16} /> Personal Info</h4>
                  <div className="detail-row">
                    <span className="detail-label">Father's Name</span>
                    <span className="detail-val">{selectedRunner.father_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date of Birth</span>
                    <span className="detail-val">
                      {selectedRunner.dob ? new Date(selectedRunner.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Gender</span>
                    <span className="detail-val">{selectedRunner.gender}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <h4><Phone size={16} /> Contact & Location</h4>
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-val">{selectedRunner.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-val">{selectedRunner.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">City, State</span>
                    <span className="detail-val">{selectedRunner.city}, {selectedRunner.state}</span>
                  </div>
                </div>

                <div className="detail-card full-width">
                  <h4><DollarSign size={16} /> Payment Information</h4>
                  <div className="detail-row">
                    <span className="detail-label">Current Status</span>
                    <span className="detail-val"><StatusBadge status={selectedRunner.payment_status} /></span>
                  </div>
                  {selectedRunner.razorpay_order_id ? (
                    <div className="detail-row">
                      <span className="detail-label">Razorpay Order ID</span>
                      <span className="detail-val" style={{ fontSize: '13px', fontFamily: 'monospace' }}>{selectedRunner.razorpay_order_id}</span>
                    </div>
                  ) : (
                    <div className="detail-row">
                      <span className="detail-label">Razorpay Order ID</span>
                      <span className="detail-val" style={{ color: '#888', fontStyle: 'italic' }}>Pending creation</span>
                    </div>
                  )}
                  {selectedRunner.razorpay_payment_id && (
                    <div className="detail-row">
                      <span className="detail-label">Razorpay Payment ID</span>
                      <span className="detail-val" style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--maroon)' }}>{selectedRunner.razorpay_payment_id}</span>
                    </div>
                  )}
                </div>

                {/* ── UPLOADED DOCUMENTS – inline image preview ── */}
                <div className="detail-card full-width">
                  <h4><FileCheck size={16} /> Uploaded Documents</h4>
                  <div className="modal-docs-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    <DocCard label="Runner Photo" url={selectedRunner.photo_url} icon={ImageIcon} />
                    <DocCard label="Proof of Age" url={selectedRunner.proof_of_age_url} icon={ShieldCheck} />
                    {selectedRunner.marksheet_url && (
                      <DocCard label="Marksheet" url={selectedRunner.marksheet_url} icon={FileCheck} />
                    )}
                    {selectedRunner.pan_url && (
                      <DocCard label="PAN Card" url={selectedRunner.pan_url} icon={ShieldCheck} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setSelectedRunner(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX (fullscreen image preview) ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out'
          }}
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'rgba(255,255,255,0.12)', border: 'none',
              borderRadius: '50%', width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff'
            }}
          >
            <X size={22} />
          </button>
          <img
            src={lightboxImg}
            alt="Document preview"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh',
              borderRadius: 12,
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              cursor: 'default'
            }}
          />
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
