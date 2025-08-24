import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {

    const { user } = useContext(AuthContext);
    
    const [chirps, setChirps] = useState([]);
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
                    setChirps(data)
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
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Page</h2>
                <p className="text-gray-600">Welcome to {user?.username || "this user"}'s profile</p>
            </div>
            <div className="space-y-4">
                {chirps.map((chirp) => (
                        <div 
                            key={chirp._id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                            >
                            <strong className="font-bold text-gray-900">{chirp.author.username}</strong>
                            <p className="text-gray-700 mt-1">{chirp.text}</p>
                            
                            {chirp.image && (
                                <img 
                                    src={chirp.image} 
                                    alt="Chirp attachment" 
                                    className="mt-3 rounded-lg max-h-60 object-cover" />
                            )}

                            <div className="flex items-center gap-2 mt-3">
                                <button 
                                    onClick={() => handleLike(chirp._id)}
                                    className={`flex items-center gap-1 text-sm font-medium ${
                                        user && chirp.likes.includes(user.id) 
                                        ? "text-pink-500"
                                        : "text-gray-500 hover:text-pink-500"
                                    }`}    
                                >❤️ Like
                                </button>
                                <span className="text-sm text-gray-500">{chirp.likes.length}</span>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
};

export default ProfilePage;