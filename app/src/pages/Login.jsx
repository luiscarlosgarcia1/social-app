//just using text we should add something in the backend

//to check if its a phone num,email
import { Link } from 'react-router-dom'
import HandleSubmit from './Loginauth'
function Login (){
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
                        placeholder="Email/Phone number"
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
