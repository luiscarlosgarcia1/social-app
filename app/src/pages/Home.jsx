import React from 'react';
import Sidebar from '../components/SidebarH';

const API = 'http://localhost:3000';

function Home() {
    const [user, setUser] = React.useState(null);
    const [profiles, setProfiles] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [matched, setMatched] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
                fetchProfiles(parsed.id);
            } catch (e) {
                console.error("Error loading user data", e);
            }
        }
    }, []);

    async function fetchProfiles(userId) {
        setLoading(true);
        try {
            const res = await fetch(`${API}/discover/${userId}`);
            const data = await res.json();
            if (data.ok) setProfiles(data.profiles);
        } catch (e) {
            console.error('Failed to fetch profiles', e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSwipe(direction) {
        const current = profiles[index];
        if (!current || !user) return;

        try {
            const res = await fetch(`${API}/swipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    swiperId: user.id,
                    swipedId: current.id,
                    direction,
                }),
            });
            const data = await res.json();
            if (data.matched) {
                setMatched(true);
                setTimeout(() => setMatched(false), 2500);
            }
        } catch (e) {
            console.error('Swipe failed', e);
        }

        setIndex(prev => prev + 1);
    }

    if (!user || loading) {
        return (
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#fff' }}>Loading...</p>
            </div>
        );
    }

    const current = profiles[index];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
            <Sidebar user={user} />

            {/* It's a match banner */}
            {matched && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(240, 80, 35, 0.92)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    zIndex: 9999, color: '#fff', textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉 It's a Match!</h1>
                    <p style={{ fontSize: '1.2rem' }}>You and {profiles[index - 1]?.fullName} liked each other.</p>
                </div>
            )}

            <div style={{ marginLeft: '260px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                {!current ? (
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#F05023' }}>No more profiles</h2>
                        <p style={{ color: '#666' }}>Check back later for new matches.</p>
                        <button className="login-btn" onClick={() => { setIndex(0); fetchProfiles(user.id); }}>
                            Refresh
                        </button>
                    </div>
                ) : (
                    <div className="auth-card" style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                        <h2 style={{ color: '#F05023', marginBottom: '5px' }}>UTRGV Match</h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Welcome, {user.fullName}</p>

                        <div style={{
                            padding: '20px', border: '1px solid #eee',
                            borderRadius: '12px', textAlign: 'left', backgroundColor: '#fafafa'
                        }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{current.fullName}</h3>

                            <span style={{
                                background: '#F05023', color: '#fff',
                                padding: '4px 12px', borderRadius: '20px',
                                fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase'
                            }}>
                                {current.role === 'student' ? 'Student' : 'Business'}
                            </span>

                            <div style={{ marginTop: '15px', color: '#444' }}>
                                <p style={{ marginBottom: '8px' }}>
                                    <strong>{current.role === 'student' ? 'Major:' : 'Project:'}</strong>{' '}
                                    {current.role === 'student' ? current.major : current.projectName}
                                </p>
                                <p style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>
                                    {current.role === 'student' ? current.bio : current.needs}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                            <button
                                className="login-btn"
                                style={{ background: '#e0e0e0', color: '#444', flex: 1, marginTop: 0 }}
                                onClick={() => handleSwipe('pass')}
                            >
                                Pass
                            </button>
                            <button
                                className="login-btn"
                                style={{ flex: 1, marginTop: 0 }}
                                onClick={() => handleSwipe('like')}
                            >
                                Like
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;