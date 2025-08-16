import { useState } from "react"

const RegisterPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
            console.log('Success',data)
        } 
    catch (error) {
            console.error('Error', error)
        }
        console.log({ username, email, password})
        setUsername("");
        setEmail("");
        setPassword("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>username</h3>
                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <h3>email</h3>
                <input 
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <h3>password</h3>
                <input 
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
        </form>
        )
    }

export default RegisterPage;