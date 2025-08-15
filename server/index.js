const express = require("express");
const cors = require("cors")

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors());

app.get('/api', (req, res) => {
    res.json({"message":"Hello from your backend!" })
})

app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    res.json({"message":"User registered"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

