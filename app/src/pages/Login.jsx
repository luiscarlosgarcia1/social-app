//just using text we should add something in the backend 
//to check if its a phone num,email
import { Link } from 'react-router-dom'
function Login (){
    return (
        <div>
        <form>
            <div>
                <input
                type = "text" 
                placeholder="Email/Phone num"
                required
                />
            </div>
            
            <div>
                <input
                type = "password"
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
