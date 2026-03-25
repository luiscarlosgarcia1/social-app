//just using text we should add something in the backend 
//to check if its a phone num,email
import { Link } from 'react-router-dom'
function Login (){
    return (
        <div>
        <form action="http://localhost:3000/login" method="POST">
            <div>
                <input
                type = "text" 
                name="emailOrPhone"
                placeholder="Email/Phone num"
                required
                />
            </div>
            
            <div>
                <input
                type = "password"
                name="password"
                placeholder="Password"
                required
                />
            </div>

            <div>
                <button
                type="submit"
                >
                Login
                </button>
            </div>
        </form>
        <p>
            Don't have an account?{' '}
            <Link to="/signup">Register here</Link>
          </p>
        </div>
    );
}
export default Login;
