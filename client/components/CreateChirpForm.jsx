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
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's happening?" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    >                            
                </textarea>
                <input type="file" onChange={(e) => setImage(e.target.files[0]) } />
                <button>Chirp</button>
            </form>
        </div>        
    )
}

export default CreateChirpForm;