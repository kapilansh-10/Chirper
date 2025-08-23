import { useState } from "react";


const CreateChirpForm = ({addChirp}) => {

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;

        addChirp({
            text,
            image
        })
        setText("")
        setImage(null)
    }

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-md space-y-4">
                <textarea
                    placeholder="What's happening?"     
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-800"
                    
                    >                            
                </textarea>
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0]) }
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold
                    file:bg-pink-50 file:text-pink-500
                    hover:file:bg-pink-100 cursor-pointer" 
                />
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full transition">
                    Chirp
                </button>
            </form>
        </div>        
    )
}

export default CreateChirpForm;