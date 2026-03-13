require("dotenv").config();
const express = require("express");
const pool = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.json())

app.use("/", express.static("public/home"));

app.use("/login", express.static("public/login"));


const validateUser = async (req, res, next) => {
    const { username, password } = req.body

    try{
        console.log("User validated")

        const result = await pool.query(
            "INSERT INTO users_accounts (username, password) VALUES ($1, $2) RETURNING *",
            [username, password]
        );
        res.json({
            status: 200,
            message: "Succes"
        })
        res.json(result.rows[0]);
    }catch(err) {
        console.log(err.message)
        return res.status(500).json({
            status: 500,
            message: "server error"
        })
    }
}



app.post("/api/login", validateUser)


app.listen(PORT, () => {
    console.log(`Running on PORT:${PORT}`)
})