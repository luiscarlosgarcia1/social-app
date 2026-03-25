import { Link } from 'react-router-dom'
function SignUp (){
    return (
        <div>
            <form>
                <div>
                    <input
                    type = "email"
                    placeholder="email"
                    required
                    />
                </div>


                <div>
                    <input 
                    type = "text"
                    placeholder="Name"
                    required
                    />
                </div>
                
                <div>
                    <input 
                    type = "tel"
                    placeholder="Phone number"
                    required
                    />
                </div>
                <div>
                    <input 
                    type =  "password"
                    placeholder = "password"
                    required
                    />
                </div>
            </form>
            <p>
                Already have a account {' '}
                <Link to = "/Login">Login here</Link>
            </p>
        </div>
    );
}

export default SignUp