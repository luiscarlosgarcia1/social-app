import React from 'react';
import Sidebar from '../components/Sidebar';

const placeholderProfiles = [
    {
        name: 'Alex Rivera',
        role: 'student',
        major: 'Computer Science',
        bio: 'Looking to work on real-world projects. Experienced in React and Node.js.',
        github: 'github.com/arivera-dev'
    },
    {
        name: 'Maria Lopez',
        role: 'business',
        projectName: 'EduTrack',
        needs: 'Looking for a frontend developer to build a dashboard for student progress tracking.',
        github: 'github.com/edutrack-org'
    },
    {
        name: 'Jordan Kim',
        role: 'student',
        major: 'Electrical Engineering',
        bio: 'Interested in IoT and embedded systems. Looking for a project to put on my resume.',
        github: 'github.com/jkim-ee'
    },
]

function Home() {
    const [user, setUser] = React.useState({ fullName: 'UTRGV Student' });
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try { 
                setUser(JSON.parse(savedUser)); 
            } catch (e) { 
                console.error("Error loading user data", e); 
            }
        }
    }, []);

    const current = placeholderProfiles[index % placeholderProfiles.length];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
            <Sidebar user={user} />

            <div style={{ marginLeft: '260px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                {!current ? (
                    <div className="auth-card">
                        <h2 style={{ color: '#F05023' }}>No more profiles</h2>
                        <button className="login-btn" onClick={() => setIndex(0)}>Start Over</button>
                    </div>
                ) : (
                    <div className="auth-card" style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                        <h2 style={{ color: '#F05023', marginBottom: '5px' }}>UTRGV Match</h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Welcome, {user.fullName}</p>

                        <div style={{ 
                            padding: '20px', 
                            border: '1px solid #eee', 
                            borderRadius: '12px', 
                            textAlign: 'left', 
                            backgroundColor: '#fafafa' 
                        }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{current.name}</h3>
                            
                            {/* Updated Role Tags */}
                            <span style={{ 
                                background: '#F05023', 
                                color: '#fff', 
                                padding: '4px 12px', 
                                borderRadius: '20px', 
                                fontSize: '0.75rem', 
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                {current.role === 'student' ? 'Student' : 'Business'}
                            </span>

                            <div style={{ marginTop: '15px', color: '#444' }}>
                                <p style={{ marginBottom: '8px' }}>
                                    <strong>{current.role === 'student' ? 'Major:' : 'Project:'}</strong> {current.role === 'student' ? current.major : current.projectName}
                                </p>
                                <p style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>
                                    {current.role === 'student' ? current.bio : current.needs}
                                </p>
                            </div>

                            <div style={{ 
                                marginTop: '15px', 
                                paddingTop: '15px', 
                                borderTop: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                                </svg>
                                <a 
                                    href={`https://${current.github}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        fontSize: '0.85rem', 
                                        color: '#F05023', 
                                        textDecoration: 'none',
                                        fontWeight: '500'
                                    }}
                                >
                                    {current.github}
                                </a>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                            <button className="login-btn" style={{ background: '#e0e0e0', color: '#444', flex: 1, marginTop: 0 }} onClick={() => setIndex(index + 1)}>
                                Pass
                            </button>
                            <button className="login-btn" style={{ flex: 1, marginTop: 0 }} onClick={() => setIndex(index + 1)}>
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