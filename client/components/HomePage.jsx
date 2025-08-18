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
                const response = await fetch("https://chirper-api-kapilansh.onrender.com/api/chirps",{
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

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("https://chirper-api-kapilansh.onrender.com/api/chirps",{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: text}) 
            })

            if(response.ok){
                const newChirpFromServer = await response.json();
                setChirps([newChirpFromServer,...chirps])
            }

            if(!response.ok) {
                console.error("Failed to save the chirp to the server")
            }
        } 
        catch (error) {
            console.error("An error occurred",error)
        }
    }

    const deleteChirp = async (chirpId) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`https://chirper-api-kapilansh.onrender.com/api/chirps/${chirpId}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.ok){
                console.log("Deletion successful")
                setChirps(chirps.filter(chirp => chirp._id !== chirpId))
            }
            else{
                console.log("Deletion unsuccessful")
            }
        } catch (error) {
            console.error("Error",error)
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
                    console.log(`Comparing Chirp Author ID: ${chirp.author._id} with Logged-in User ID: ${user.id}`),
                    <li key={chirp._id}>
                        <strong>{chirp.author.username}</strong>
                        <p>{chirp.text}</p> 
                        { user && chirp.author._id === user.id &&  <button onClick={() => deleteChirp(chirp._id)}>Delete</button>}
                    </li>
                ))}
            </ul>
        </div>
    )
}