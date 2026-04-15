import React from 'react';

const placeholderProfiles = [
    {
        name: 'Alex Rivera',
        role: 'student',
        major: 'Computer Science',
        classification: 'Junior',
        bio: 'Looking to work on real-world projects. Experienced in React and Node.js.',
    },
    {
        name: 'Maria Lopez',
        role: 'business',
        projectName: 'EduTrack',
        industry: 'EdTech',
        needs: 'Looking for a frontend developer to build a dashboard for student progress tracking.',
    },
    {
        name: 'Jordan Kim',
        role: 'student',
        major: 'Electrical Engineering',
        classification: 'Senior',
        bio: 'Interested in IoT and embedded systems. Looking for a project to put on my resume.',
    },
]

function Home() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [index, setIndex] = React.useState(0)

    const current = placeholderProfiles[index]

    function handlePass() {
        setIndex((prev) => prev + 1)
    }

    function handleLike() {
        setIndex((prev) => prev + 1)
    }

    if (!current) {
        return (
            <div className="auth-page-container">
                <div className="auth-card">
                    <h2>No more profiles</h2>
                    <p>Check back later for more matches.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>UTRGV Match</h2>
                <p>Welcome, {user?.fullName || 'User'}</p>

                <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '4px' }}>{current.name}</h3>
                    <span style={{ fontSize: '0.8rem', background: '#F05023', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
                        {current.role === 'student' ? 'Builder' : 'Inventor'}
                    </span>

                    {current.role === 'student' ? (
                        <div style={{ marginTop: '12px' }}>
                            <p><strong>Major:</strong> {current.major}</p>
                            <p><strong>Year:</strong> {current.classification}</p>
                            <p style={{ marginTop: '8px' }}>{current.bio}</p>
                        </div>
                    ) : (
                        <div style={{ marginTop: '12px' }}>
                            <p><strong>Project:</strong> {current.projectName}</p>
                            <p><strong>Industry:</strong> {current.industry}</p>
                            <p style={{ marginTop: '8px' }}>{current.needs}</p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button className="login-btn" style={{ background: '#ccc', color: '#333', flex: 1 }} onClick={handlePass}>
                        Pass
                    </button>
                    <button className="login-btn" style={{ flex: 1 }} onClick={handleLike}>
                        Like
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;
