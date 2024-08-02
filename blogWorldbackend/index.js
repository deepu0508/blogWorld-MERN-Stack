const connectToMongo = require("./database")
const cors = require("cors")
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")

connectToMongo();

const app = express();
const port = 8900
app.use(cors());
app.use(bodyParser.json({limit:"1000mb"}));
app.use(bodyParser.urlencoded({
    extended:true,
    limit: "1000mb",
    parameterLimit: 1000000
}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname,"index.html")) })

app.use("/api/auth",require("./routes/auth"));
app.use("/api/blog",require("./routes/blog"));
app.use("/api/comments",require("./routes/comments"));
app.use("/api/blogInfo",require("./routes/blogdetails"));

app.listen(port,()=>{console.log(`http://localhost:${port}`)})