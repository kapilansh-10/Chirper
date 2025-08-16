const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const User = require("./models/User")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected successfully"))
    .catch(err => console.error("MongoDB connection error",err))

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors());

app.get('/api', (req, res) => {
    res.json({"message":"Hello from your backend!" })
})

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            email,
            username,
            password
        })
        await newUser.save()
        console.log("User saved successfully")
        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        console.error("Error saving document",error.message);
        res.status(400).json({message: "Error registering user",error: error.message})
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

