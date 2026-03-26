import { Link } from 'react-router-dom'

function SignUp (){
    return (
        <div className="auth-page-container">
            {/* auth-page-container: Centers the card on the screen */}
            
            <div className="auth-card">
                {/* auth-card: The white box with the shadow and orange top border */}
                
                <h2>Join UTRGV Match</h2>
                <p>Create an account to start finding partners</p>

                <form className="auth-form">
                    
                    {/* input-group: Adds space between each text box */}
                    <div className="input-group">
                        <input
                        type = "email"
                        placeholder="Email"
                        required
                        />
                    </div>

                    <div className="input-group">
                        <input 
                        type = "text"
                        placeholder="Full Name"
                        required
                        />
                    </div>
                    
                    <div className="input-group">
                        <input 
                        type = "tel"
                        placeholder="Phone number"
                        required
                        />
                    </div>

                    <div className="input-group">
                        <input 
                        type = "password"
                        placeholder = "Password"
                        required
                        />
                    </div>

                    {/* login-btn: Applies the UTRGV Orange styling */}
                    <button type="submit" className="login-btn">
                        Create Account
                    </button>
                </form>

                <p className="footer-text">
                    Already have an account?{' '}
                    <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;