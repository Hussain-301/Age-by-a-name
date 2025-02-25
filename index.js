import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { name: null, age: null });
});

app.get("/generate", async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.render("index", { name: null, age: null });
    }

    try {
        const response = await axios.get(`https://api.agify.io/?name=${name}`);
        res.render("index", {
            name: name,
            age: response.data.age
        });
    } catch (error) {
        console.log("There was an error: ", error.message);
        res.render("index", { name: null, age: null });
    }
});

app.listen(port, () => console.log(`Visit: http://localhost:${port}`));
