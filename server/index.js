const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const User = require("./models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const Chirp = require("./models/Chirp");

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

    if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: hashPassword
        })
        await newUser.save()
        console.log("User saved successfully")
        res.status(201).json({message: "User registered successfully"})

    } catch (error) {
        console.error("Error saving document",error.message);
        res.status(400).json({message: "Error registering user",error: error.message})
    }
})

app.post('/api/auth/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({message: "Invalid credentials"})
        }

        // Start of jwt logic
        const payload = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } 
    catch (error) {
        console.error("Login error",error);
        res.status(500).json({ message: "Server error during login" })
    }
})

app.post('/api/chirps',auth, async (req, res) => {

    const { text } = req.body;

    // basic validation
    if(!text || text.trim() === '') {
        return res.status(400).json({ message: "Chirp cannot be empty "})
    }

    try {
        const newChirp = new Chirp ({
            text,
            author: req.user.id
        })
        await newChirp.save()
        const populateChirp = await Chirp.findById(newChirp._id).populate('author','username')
        res.status(201).json(populateChirp)
        res.status(201).json(newChirp)
    } catch (error) {
        res.status(500).json({ message: "Server error, could not create a chirp" })
    }
})

app.get('/api/chirps', auth, async (req, res) => {

    try {
        const allChirps = await Chirp.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 })

        res.status(200).json(allChirps);

    } catch (error) {
        console.error("Error fetching chirps:",error)
        res.status(500).json({ message: "Unable to get chirps" })
    }
})

// deleting a chirp by id
app.delete('/api/chirps/:id', auth, async (req, res) => {

    try {
        const ChirpToDelete = await Chirp.findById(req.params.id)
        if(ChirpToDelete === null) {
            return res.status(404).json({message: "Not found"})
        }
        if(ChirpToDelete.author.toString() === req.user.id){
            await ChirpToDelete.deleteOne()
            res.status(200).json({ message: "Chirp deleted successfully" })
        }
        else{
            res.status(401).send({ message: "Unauthorized response" })
        }
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// editing a chirp by id
app.patch('/api/chirps/:id', auth, async (req, res) => {

    try {
        const ChirpToEdit = await Chirp.findById(req.params.id);
        if(ChirpToEdit === null) {
            return res.status(404).json({message: "Not found"});
        }
        if(ChirpToEdit.author.toString() === req.user.id){
            const newText = req.body.text;
            const updatedChirp = await Chirp.findByIdAndUpdate(req.params.id, { text: newText}, {new: true});
            res.status(200).json(updatedChirp)
        }
        else{
            res.status(401).json({ message: "Unauthorized Network" })
        }
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// getting all the chirps of a specific user
app.get('/api/chirps/user/:userId', async (req, res) => {

    const { userId } = req.params;

    try {
        const userChirps = await Chirp.find({
            author: userId
        }).populate('author','username').sort({createdAt: -1});
        res.status(200).json(userChirps);
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

