// useState hook lets add state. store data
import axios from "axios";
import { act, useState } from "react";
import { useNavigate } from 'react-router-dom';

// functional component using useState to manage state of form fields
const LoginPage = () => {
    // State to store form data (username, password)
    // const [state-variable, state-function]
    // inital value is ''. setUsername is to update stateful variable username
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState('');

    const navigate = useNavigate();  // Hook for redirecting after login

    // function to handle form submission
    const handleSubmit = async (event, actionType) => {
        // Prevent default behaviour of reloading when submit
        event.preventDefault();
        console.log('Login submitted: ', { username, password, actionType})

        try {
            // Make post request to backend to authenticate
            const url = actionType === 'login' ? 'http://localhost:5000/user/login' : 'http://localhost:5000/user/signup'; 
            const response = await axios.post(url, {
                username,
                password,
            });

            // If login is successful, store the token and redirect
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token); // Store token in browser's presistent storage
                navigate('/dashboard'); // Redirect
            }
        } catch (err) {
            setError('Invalid Error or password');
        }
    }; 
    
    // Controlled component as React controls the input value
    //<form onSubmit={handleSubmit}>
    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{color: 'red' }}>{error}</p>}
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        requried
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, 'login')}
                    >Login</button>
                    
                    <button 
                        type="submit"
                        onClick={(e) => handleSubmit(e, 'signup')}
                    >Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage