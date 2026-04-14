import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [error, setError] = useState('')

    async function HandleSubmit(event) {
        event.preventDefault()
        setError('')
        const email = event.target.email.value
        const password = event.target.password.value
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (data.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = data.user.role === 'business' ? '/BusinessProfile' : '/StudentProfile'
            } else if (data.code === 'INVALID_CREDENTIALS') {
                setError('Invalid email or password.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } catch {
            setError('Could not reach the server. Make sure it is running.')
        }
    }

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>UTRGV Match</h2>
                <p>Sign in to find your project partner</p>

                <form className="auth-form" onSubmit={HandleSubmit}>
                    <div className="input-group">
                        <input
                        type = "text" 
                        name="email"
                        placeholder="Email"
                        required
                        />
                    </div>
                    
                    <div className="input-group">
                        <input
                        type = "password"
                        name="password"
                        placeholder="Password"
                        required
                        />
                    </div>

                    {error && <p style={{ color: '#e53e3e', marginTop: '8px', fontSize: '0.9rem' }}>{error}</p>}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <p className="footer-text">
                    Don't have an account?{' '}
                    <Link to="/signup">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
