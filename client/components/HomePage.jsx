import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useState } from "react";
import { useEffect } from "react";
import CreateChirpForm from "./CreateChirpForm";
import { Link } from "react-router-dom";
import ChirpSkeleton from "./ChirpSkeletion";

export const HomePage = () => {

    const { user, logout } = useContext(AuthContext);

    const [chirps, setChirps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingChirpId, setEditingChirpId] = useState(null);
    const [editedText, setEditedText] = useState("")

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
        return (
            <div>
                <ChirpSkeleton/>
                <ChirpSkeleton/>
                <ChirpSkeleton/>
            </div>
        )
    }

    if(error) {
        return <div className="text-center text-red-500">Error: {error}</div>
    }

    

    const addChirp = async ({text,image}) => {
        const chirp = {
            id: Date.now(),
            author: user.username,
            text: text
        }

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('text',text);
            if (image) {
                formData.append('image', image)
            }
            const response = await fetch("https://chirper-api-kapilansh.onrender.com/api/chirps",{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData 
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
    
    const handleSaveEdit = async (chirpId) => {

        try {
            const token = localStorage.getItem('token');
            const response= await fetch(`https://chirper-api-kapilansh.onrender.com/api/chirps/${chirpId}`,{
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({text: editedText})
            })

            if(response.ok){
                const updatedChirp = await response.json();
                setChirps(chirps.map(chirp => chirp._id === chirpId ? updatedChirp : chirp))
                setEditingChirpId(null);
                setEditedText("");
            }
        }

        catch (error) {
            console.error("Error",error)
        }
    }

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

    return (
        <div className="max-w-2xl mx-auto px-4">
            {user &&
                (
                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg font-semibold text-gray-800">Welcome, {user.username}</p>
                    <button 
                        onClick={logout}
                        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-2"
                        >Logout
                    </button>
                </div>
            )}

            <div className="mb-8">
                <CreateChirpForm addChirp={addChirp}/>
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Chirp Feed</h2>
            <ul className="space-y-4">
                {chirps.map((chirp) => (
                    console.log(`Comparing Chirp Author ID: ${(chirp.author && chirp.author._id) || chirp.author} with Logged-in User ID: ${user.id}`),
                    <li 
                        key={chirp._id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >

                        <Link to={`/profile/${(chirp.author && chirp.author._id) || chirp.author}`}
                            className="font-bold text-gray-900 hover:underline"
                            >
                            <strong>{(chirp.author && chirp.author.username) || 'Unknown'}</strong>
                        </Link>

                        {editingChirpId === chirp._id ? (
                                <div className="mt-10">
                                <textarea 
                                    value={editedText} 
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className=" w-full p-2 border rounded-lg focus:ring focus:ring-pink-300 "
                                /> 
                                <div className="flex gap-2 mt-2">
                                    <button 
                                        onClick={ () => handleSaveEdit(chirp._id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                        >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingChirpId(null)}
                                        className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400"
                                        >
                                        Cancel
                                    </button> 
                                </div>
                        </div>
                        ):(
                            <div className="mt-2">
                                <p className="text-gray-700">{chirp.text}</p>
                                {chirp.image && (
                                    <img
                                        src={chirp.image} 
                                        alt="Chirp attachment" 
                                        className="mt-3 rounded-lg max-h-60 object-cover"
                                    />
                            )}

                            <div className="flex items-center gap-3 mt-3">
                                <button 
                                    // style={{ color: chirp.likes.includes(user.id) ? 'red' : 'white'}} 
                                    onClick={() => handleLike(chirp._id)}
                                    className={`flex items-center gap-1 text-sm font-medium ${
                                        chirp.likes.includes(user.id)
                                        ? "text-pink-500"
                                        : "text-gray-500 hover:text-pink-500"
                                    }`}
                                    >
                                    ❤️ Like
                                </button>
                                <span className="text-sm text-gray-500">{chirp.likes.length}</span>

                                {user && (((chirp.author && chirp.author._id) || chirp.author) === user.id) && (
                                    <div className="flex gap-2 ml-auto">
                                        <button 
                                            onClick={() => deleteChirp(chirp._id)}
                                            className="text-sm text-red-500 hover:underline"
                                            >Delete
                                        </button> 
                                        <button 
                                                onClick={() => {setEditingChirpId(chirp._id); 
                                                setEditedText(chirp.text)}}
                                                className="text-sm text-blue-500 hover:underline"
                                            >Edit
                                        </button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        )} 
                    </li>
                ))}
            </ul>
        </div>
    )
}