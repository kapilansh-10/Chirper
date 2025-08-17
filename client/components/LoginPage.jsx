import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = ({setCurrentView}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {email, password};
        try {
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
            });

            if(!response.ok) {
                throw new Error("Login Failed")
            }

            const data = await response.json();
            console.log("Login success",data);

            login(data.user);
        } 
        catch (error) {
            console.error("Login Error",error)
            setError(error.message)    
        }
        setEmail("");
        setPassword("")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>email</h3>
                <input 
                    type="text"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h3>password</h3>
                <input 
                    type="text"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => setCurrentView('register')}>Register</button>
        </>
    )
}

export default LoginPage;