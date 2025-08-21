import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {

    const { user } = useContext(AuthContext);
    
    const [userChirps, setUserChirps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const { userId } = useParams()
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://chirper-api-kapilansh.onrender.com/api/chirps/user/${userId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                })
                const data = await response.json()
                if(response.ok){
                    console.log("Fetched user chips successfully")
                    setUserChirps(data)
                }
                else{
                    console.log("Unable to fetch User Chirps")
                }
            } 
            catch (error) {
                console.error('Error',error);
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
    },[userId])


    const handleLike = async (chirpId) => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://chirper-api-kapilansh.onrender.com/api/chirps/${chirpId}/likes`,{
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok){
                const updatedChirp = await response.json();
                setChirps(chirps.map(chirp => chirp._id === chirpId ? updatedChirp : chirp))
            }
        } catch (error) {
            console.error("Error",error)
        }
    }
    
    if(loading) {
        return <div>Loading ...</div>
    }

    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2>This is a user's profile page!</h2>
            <ul>
                {userChirps.map((userChirp) => (
                    <li key={userChirp._id}>
                        <strong>{userChirp.author.username}</strong>
                        <p>{userChirp.text}</p>
                        <button style={{ color: userChirp.likes.includes(user.id) ? 'red' : 'white'}} onClick={() => handleLike(chir._id)}>Like</button>
                        <span>{userChirp.likes.length}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ProfilePage;