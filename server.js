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
        
        res.json(result.rows[0]);
    }catch(err) {
        return res.status(500).json({
            status: 500,
            message: "server error"
        })
    }
}

app.get("/check-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(result.rows[0]);
    } catch (err) {
        console.error("Database connection error:", err.message);
        res.status(500).send("DB connection failed: " + err.message);
    }
});

app.post("/login", validateUser)


app.listen(PORT, () => {
    console.log(`Running on PORT:${PORT}`)
})