import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    
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
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ProfilePage;