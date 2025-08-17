import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useState } from "react";
import { useEffect } from "react";
import CreateChirpForm from "./CreateChirpForm";

export const HomePage = () => {

    const { user, logout } = useContext(AuthContext);

    const [chirps, setChirps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {

                const token = localStorage.getItem('token');
                if(!token){
                    throw new Error ("Authentication token not found")
                }
                const response = await fetch("http://localhost:5000/api/chirps",{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if(!response.ok) {
                    throw new Error("Failed to fetch chirps")
                }

                const data =await response.json()
                console.log(data)
                setChirps(data);
            } 
            catch (error) {
                console.error("Error",error)
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        if (user) {
            fetchData()
        }
    },[user])

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error}</div>
    }

    

    const addChirp = async (text) => {
        const chirp = {
            id: Date.now(),
            author: user.username,
            text: text
        }
        setChirps([...chirps, chirp])

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/api/chirps",{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: text}) 
            })

            if(!response.ok) {
                console.error("Failed to save the chirp to the server")
            }
        } 
        catch (error) {
            console.error("An error occurred",error)
        }
    }

    return (
        <div>
            {user &&
                (
                <div>
                    <p>Welcome, {user.username}</p>
                    <button onClick={logout}>Logout</button>
                    <CreateChirpForm addChirp={addChirp}/>
                </div>
            )}

            <h2>Chirp Feed</h2>
            <ul>
                {chirps.map((chirp) => (
                    <li key={chirp._id}>
                        <strong>{chirp.author.username}</strong>
                        <p>{chirp.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}