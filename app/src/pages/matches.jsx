import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SidebarH';

const API = 'http://localhost:3000';

export default function Matches() {
    const [user, setUser] = React.useState(null);
    const [matches, setMatches] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
                fetchMatches(parsed.id);
            } catch (e) {
                console.error('Error loading user', e);
            }
        }
    }, []);

    async function fetchMatches(userId) {
        setLoading(true);
        try {
            const res = await fetch(`${API}/matches/${userId}`);
            const data = await res.json();
            if (data.ok) setMatches(data.matches);
        } catch (e) {
            console.error('Failed to fetch matches', e);
        } finally {
            setLoading(false);
        }
    }

    function handleMessage(match) {
        // Pass matchId and the other user's info to Messages page
        navigate('/messages', { state: { matchId: match.matchId, otherUser: match } });
    }

    if (!user || loading) {
        return (
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#888' }}>Loading matches...</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar user={user} />
            <div style={{
                marginLeft: '260px', padding: '40px', width: '100%',
                minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Georgia, serif'
            }}>
                <h1 style={{ color: '#F05023', marginBottom: '8px', fontSize: '2rem' }}>My Matches</h1>
                <p style={{ color: '#888', marginBottom: '32px', fontSize: '0.95rem' }}>
                    {matches.length} mutual {matches.length === 1 ? 'connection' : 'connections'}
                </p>

                {matches.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '60px 20px',
                        color: '#888', fontSize: '1rem'
                    }}>
                        <p style={{ fontSize: '2rem', marginBottom: '12px' }}>💔</p>
                        <p>No matches yet. Go like some profiles!</p>
                        <button
                            onClick={() => navigate('/home')}
                            style={{
                                marginTop: '16px', padding: '10px 24px',
                                backgroundColor: '#F05023', color: '#fff',
                                border: 'none', borderRadius: '8px',
                                cursor: 'pointer', fontWeight: '600'
                            }}
                        >
                            Discover
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {matches.map(match => (
                            <div key={match.matchId} style={{
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

                                <h3 style={{ margin: '0 0 4px', color: '#1a1a1a', fontSize: '1rem' }}>
                                    {match.fullName}
                                </h3>

                                <span style={{
                                    background: '#F05023', color: '#fff',
                                    padding: '2px 10px', borderRadius: '20px',
                                    fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase'
                                }}>
                                    {match.role === 'student' ? 'Student' : 'Business'}
                                </span>

                                <p style={{ margin: '10px 0 4px', fontSize: '0.8rem', color: '#555', fontWeight: '600' }}>
                                    {match.role === 'student' ? match.major : match.projectName}
                                </p>

                                <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
                                    {match.role === 'student' ? match.bio : match.needs}
                                </p>

                                <button
                                    onClick={() => handleMessage(match)}
                                    style={{
                                        width: '100%', padding: '10px', backgroundColor: '#F05023',
                                        color: '#fff', border: 'none', borderRadius: '8px',
                                        cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                                    }}
                                >
                                    Message
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}