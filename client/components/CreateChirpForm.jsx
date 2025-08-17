import { useState } from "react";


const CreateChirpForm = ({addChirp}) => {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;

        addChirp(text)
        setText("")
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
                <button>Chirp</button>
            </form>
        </div>        
    )
}

export default CreateChirpForm;