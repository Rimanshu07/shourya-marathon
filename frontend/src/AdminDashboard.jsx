import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Users, DollarSign, Activity, Eye, X, 
  LogOut, LayoutDashboard, Image as ImageIcon, FileCheck, 
  CheckCircle, XCircle, Clock, Calendar, Phone, MapPin, Mail, 
  ShieldCheck, ExternalLink, ChevronRight
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
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD' | 'REGISTRATIONS'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedRunner, setSelectedRunner] = useState(null);

  // Helper to format image URLs from absolute paths
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    const filename = filePath.split(/[\/\\]/).pop();
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  };

  // Dynamic Categories
  const uniqueCategories = useMemo(() => {
    const cats = new Set(registrations.map(r => r.category).filter(Boolean));
    return Array.from(cats);
  }, [registrations]);

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

  // Memoized filtered data
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const matchesSearch = 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'ALL' || reg.payment_status === statusFilter;
      const matchesCategory = categoryFilter === 'ALL' || reg.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [registrations, searchTerm, statusFilter, categoryFilter]);

  // Derived Stats
  const totalRunners = registrations.length;
  const completedPayments = registrations.filter(r => r.payment_status === 'COMPLETED').length;
  const pendingPayments = registrations.filter(r => r.payment_status === 'PENDING').length;
  const estimatedRevenue = completedPayments * 1000; // Assuming approx average fee

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'COMPLETED':
        return <span className="admin-badge success"><CheckCircle size={14}/> Paid</span>;
      case 'FAILED':
        return <span className="admin-badge danger"><XCircle size={14}/> Failed</span>;
      default:
        return <span className="admin-badge warning"><Clock size={14}/> Pending</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <ShieldCheck size={32} />
          </div>
          <h2>Admin Secure Access</h2>
          <p>Enter your credentials to manage registrations.</p>
          <form onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="admin@shaurya.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="admin-input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <div className="admin-error-msg">{loginError}</div>}
            <button type="submit" className="admin-btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? 'Authenticating...' : 'Secure Login'}
            </button>
            <button type="button" className="admin-btn-link" onClick={() => window.location.hash = ''}>
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
          <div className="admin-logo">SD</div>
          <div>
            <h3>Shaurya Daur</h3>
            <span>Admin Portal</span>
          </div>
        </div>
        
        <nav className="admin-nav">
          <a href="#admin" className={`admin-nav-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('DASHBOARD'); }}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#admin" className={`admin-nav-item ${activeTab === 'REGISTRATIONS' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('REGISTRATIONS'); }}>
            <Users size={20} /> Registrations
          </a>
          <div className="admin-nav-divider"></div>
          <a href="#admin" className="admin-nav-item danger" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
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
            <p className="admin-page-subtitle">Manage and monitor marathon participants</p>
          </div>
          <button className="admin-btn-outline" onClick={() => window.open(window.location.origin + '/', '_blank')}>
            <ExternalLink size={18} /> View Live Site
          </button>
        </header>

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
            
            {/* TAB CONTENT: DASHBOARD */}
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
                    <div className="stat-icon special"><DollarSign size={24} /></div>
                    <div className="stat-details">
                      <span className="stat-label">Est. Revenue</span>
                      <span className="stat-value">₹{(estimatedRevenue / 1000).toFixed(1)}k+</span>
                    </div>
                  </div>
                </div>

                <div className="admin-table-container">
                  <div className="admin-toolbar" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1a1a2e' }}>Recent Registrations</h3>
                    <button className="admin-btn-outline" onClick={() => setActiveTab('REGISTRATIONS')}>
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Runner Details</th>
                          <th>Contact Info</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.slice(0, 5).map(reg => (
                          <tr key={reg.id}>
                            <td><strong>#{reg.id}</strong></td>
                            <td>
                              <div className="runner-name">{reg.name}</div>
                              <div className="runner-loc">{reg.city}, {reg.state}</div>
                            </td>
                            <td>
                              <div className="runner-email">{reg.email}</div>
                              <div className="runner-phone">{reg.phone}</div>
                            </td>
                            <td>
                              <span className="admin-category-tag">{(reg.category || '').replace(/_/g, ' ')}</span>
                            </td>
                            <td>
                              <StatusBadge status={reg.payment_status} />
                            </td>
                            <td>
                              <button className="admin-btn-icon" onClick={() => setSelectedRunner(reg)} title="View Details">
                                <Eye size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* TAB CONTENT: REGISTRATIONS */}
            {activeTab === 'REGISTRATIONS' && (
              <div className="admin-table-container">
                {/* Toolbar */}
                <div className="admin-toolbar">
                  <div className="admin-search">
                    <Search size={18} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search by name, email or phone..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="admin-filters">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="ALL">All Status</option>
                      <option value="COMPLETED">Paid Only</option>
                      <option value="PENDING">Pending Only</option>
                      <option value="FAILED">Failed Only</option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="ALL">All Categories</option>
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Runner Details</th>
                        <th>Contact Info</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="admin-empty-state">No matching records found.</td>
                        </tr>
                      ) : (
                        filteredRegistrations.map(reg => (
                          <tr key={reg.id}>
                            <td><strong>#{reg.id}</strong></td>
                            <td>
                              <div className="runner-name">{reg.name}</div>
                              <div className="runner-loc">{reg.city}, {reg.state}</div>
                            </td>
                            <td>
                              <div className="runner-email">{reg.email}</div>
                              <div className="runner-phone">{reg.phone}</div>
                            </td>
                            <td>
                              <span className="admin-category-tag">{(reg.category || '').replace(/_/g, ' ')}</span>
                            </td>
                            <td>
                              <StatusBadge status={reg.payment_status} />
                            </td>
                            <td>
                              <button className="admin-btn-icon" onClick={() => setSelectedRunner(reg)} title="View Details">
                                <Eye size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* DETAILS MODAL */}
      {selectedRunner && (
        <div className="admin-modal-overlay" onClick={() => setSelectedRunner(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Runner Profile <span>#{selectedRunner.id}</span></h2>
              <button className="admin-modal-close" onClick={() => setSelectedRunner(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="admin-modal-body">
              
              <div className="modal-profile-header">
                <div className="profile-avatar">
                  {selectedRunner.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                  <h3>{selectedRunner.name}</h3>
                  <p><StatusBadge status={selectedRunner.payment_status} /> • Registered on {new Date(selectedRunner.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="modal-details-grid">
                
                <div className="detail-card">
                  <h4><Users size={16}/> Personal Info</h4>
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
                  <h4><Phone size={16}/> Contact & Location</h4>
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
                  <h4><DollarSign size={16}/> Payment Information</h4>
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

                <div className="detail-card full-width">
                  <h4><FileCheck size={16}/> Uploaded Documents</h4>
                  <div className="modal-docs-grid">
                    
                    <div className="doc-item">
                      <div className="doc-icon"><ImageIcon size={32} /></div>
                      <div className="doc-info">
                        <strong>Runner Photo</strong>
                        {selectedRunner.photo_url ? (
                          <a href={getFileUrl(selectedRunner.photo_url)} target="_blank" rel="noreferrer" className="doc-link">
                            View Image <ExternalLink size={14}/>
                          </a>
                        ) : (
                          <span className="doc-missing">Not uploaded</span>
                        )}
                      </div>
                    </div>

                    <div className="doc-item">
                      <div className="doc-icon"><ShieldCheck size={32} /></div>
                      <div className="doc-info">
                        <strong>Proof of Age</strong>
                        {selectedRunner.proof_of_age_url ? (
                          <a href={getFileUrl(selectedRunner.proof_of_age_url)} target="_blank" rel="noreferrer" className="doc-link">
                            View Document <ExternalLink size={14}/>
                          </a>
                        ) : (
                          <span className="doc-missing">Not uploaded</span>
                        )}
                      </div>
                    </div>

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

    </div>
  );
};

export default AdminDashboard;
