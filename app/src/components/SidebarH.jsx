import React from 'react';
import { useNavigate } from 'react-router-dom';

 
export default function Sidebar({ user }) {
    const navigate = useNavigate();
    const storeduser = JSON.parse(localStorage.getItem('user'))
    const handleclick = () =>
{
    if (storeduser.role == 'student'){
        navigate('/StudentProfile')
    }
    else {
        navigate('/BusinessProfile')
}}
    const navItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '8px',
        color: '#444',
        fontWeight: '500',
        transition: 'all 0.2s ease',
    };

    // Helper to wrap SVG paths safely
    const IconWrapper = ({ children }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F05023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {children}
        </svg>
    );

    return (
        <div style={{
            width: '260px', height: '100vh', backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0', display: 'flex',
            flexDirection: 'column', padding: '24px 16px', position: 'fixed',
            left: 0, top: 0, zIndex: 1000
        }}>
            {/* User Profile Header */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', 
                    backgroundColor: '#F05023', color: '#fff', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px', fontSize: '1.2rem', fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(240, 80, 35, 0.2)'
                }}>
                    {user?.fullName?.charAt(0) || 'U'}
                </div>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#1a1a1a' }}>{user?.fullName || 'User'}</h3>
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>Computer Science</p>
            </div>

            {/* Navigation Links */}
            <nav style={{ flex: 1 }}>
                <div onClick={() => navigate('/home')} style={navItemStyle} className="nav-item">
                    <IconWrapper>
                        <>
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </>
                    </IconWrapper>
                    Discover
                </div>
                
                <div onClick={() => navigate('/Matches')} style={navItemStyle} className="nav-item">
                    <IconWrapper>
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </IconWrapper>
                    My Matches
                </div>

                <div onClick={() => navigate('/Messages')} style={navItemStyle} className="nav-item">
                    <IconWrapper>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </IconWrapper>
                    Messages
                </div>

                <div 
                 onClick = {handleclick} style={navItemStyle} className="nav-item">
                    <IconWrapper>
                        <>
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </>
                    </IconWrapper>
                    Edit Profile
                </div>

                <div style={navItemStyle} className="nav-item">
                    <IconWrapper>
                        <>
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                            <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </>
                    </IconWrapper>
                    My GitHub
                </div>
            </nav>

            {/* Logout Button */}
            <button style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px',
                border: 'none', backgroundColor: 'transparent', color: '#F05023',
                cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto'
            }}>
                <IconWrapper>
                    <>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" x2="9" y1="12" y2="12"/>
                    </>
                </IconWrapper>
                Logout
            </button>
        </div>
    );
}