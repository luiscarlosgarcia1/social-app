import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SidebarH';

const hardcodedMatches = [
    { id: 1, fullName: 'Carlos Rivera', role: 'business', major: 'Business Administration', bio: 'Looking for a dev intern for my startup.' },
    { id: 2, fullName: 'Sofia Mendez', role: 'student', major: 'Computer Science', bio: 'Passionate about UI/UX and React.' },
    { id: 3, fullName: 'James Tran', role: 'business', major: 'Marketing', bio: 'Need a mobile dev for a summer project.' },
    { id: 4, fullName: 'Mia Lopez', role: 'student', major: 'Data Science', bio: 'Into ML and backend systems.' },
];

export default function Matches() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar user={user} />
            <div style={{
                marginLeft: '260px', padding: '40px', width: '100%',
                minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Georgia, serif'
            }}>
                <h1 style={{ color: '#F05023', marginBottom: '8px', fontSize: '2rem' }}>My Matches</h1>
                <p style={{ color: '#888', marginBottom: '32px', fontSize: '0.95rem' }}>
                    {hardcodedMatches.length} mutual connections
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {hardcodedMatches.map(match => (
                        <div key={match.id} style={{
                            backgroundColor: '#fff', borderRadius: '12px',
                            padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            borderTop: '4px solid #F05023'
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                backgroundColor: '#F05023', color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px'
                            }}>
                                {match.fullName.charAt(0)}
                            </div>
                            <h3 style={{ margin: '0 0 4px', color: '#1a1a1a', fontSize: '1rem' }}>{match.fullName}</h3>
                            <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#F05023', fontWeight: '600' }}>
                                {match.major}
                            </p>
                            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
                                {match.bio}
                            </p>
                            <button
                                onClick={() => navigate('/messages')}
                                style={{
                                    width: '100%', padding: '10px', backgroundColor: '#F05023',
                                    color: '#fff', border: 'none', borderRadius: '8px',
                                    cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                                }}>
                                Message
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}