import { useState } from "react"

const RegisterPage = ({setCurrentView}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };
        setError(null);
        setSuccessMessage(null);

        if(!username.trim() || !email.trim() || !password){
            setError("All fields are required");
            alert("All fields are required.");
            return;
        }

    try {
        const response = await fetch("https://chirper-api-kapilansh.onrender.com/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
            console.log('Success',data)
            alert(data.message);
        } 
    catch (error) {
            console.error('Error', error)
        }
        console.log({ username, email, password})
        setUsername("");
        setEmail("");
        setPassword("");
        setCurrentView('login')
    }
    return (
            // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-pink-50" >
            // </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 relative">
                <button 
                    onClick={() => setCurrentView('landing')} 
                    className="absolute top-6 left-6 text-gray-600 hover:text-indigo-600 font-medium flex items-center gap-2"
                >
                    &larr; Back to Home
                </button>
                <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-black mb-5">Register an account</h1>
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
                        <div>
                            <h3 className="mb-2 font-semibold text-xl" >Username</h3>
                            <div className="mt-2">
                                <input 
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 bg-white border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"  
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold text-xl" >Email</h3>
                            <input 
                                type="text"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 bg-white border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"  
                            />
                        </div>

                        <h3 className="mb-2 font-semibold text-xl" >Password</h3>
                            <input 
                                type="text"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 bg-white border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
                            />
                        <br />
                        <button 
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-3"
                        >Register</button>
                    </form>
            </div>
        )
    }

export default RegisterPage;