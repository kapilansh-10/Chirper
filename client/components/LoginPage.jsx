import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = ({setCurrentView}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState)
    }

    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {email, password};
        try {
            const response = await fetch("https://chirper-api-kapilansh.onrender.com/api/auth/login",{
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

            if (data.token) {
                localStorage.setItem('token', data.token)
            }
        } 
        catch (error) {
            console.error("Login Error",error)
            setError(error.message)    
        }
        setEmail("");
        setPassword("")
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
        <form onSubmit={handleSubmit} className="bg-red-300 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h3 className="mb-2 font-semibold text-xl" >Email</h3>
                <input 
                    type="text"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-white rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300 mb-4"
                />
                <h3 className="mb-2 font-semibold text-xl">Password</h3>
                <div className="relative mb-4">
                    <input 
                        type={isPasswordVisible ? "text" : "password"}
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-white rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300 "
                    />
                    <span 
                        onClick={togglePasswordVisibility} 
                        className="icon-style absolute top-1/2 right-0 -translate-y-1/2 pr-3 cursor-pointer ">
                        {isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}
                    </span>
                </div>
                <button 
                    type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-3">
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-700 text-xl">Don't have an account?</p>
            <button onClick={() => setCurrentView('register')} className="text-blue-800 hover:underline font-semibold text-xl">Register</button>        
    </div>
    )
}

export default LoginPage;