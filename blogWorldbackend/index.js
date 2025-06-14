const connectToMongo = require("./database")
const cors = require("cors")
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config();

connectToMongo();

const app = express();
const port = 8900
app.use(cors());
app.use(bodyParser.json({limit:"2000mb"}));
app.use(bodyParser.urlencoded({
    extended:true,
    limit: "2000mb",
    parameterLimit: 2000000
}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname,"index.html")) })

app.use("/api/auth",require("./routes/auth"));
app.use("/api/blog",require("./routes/blog"));
app.use("/api/comments",require("./routes/comments"));
app.use("/api/blogInfo",require("./routes/blogdetails"));
app.use("/direct/mail",require("./routes/emailSend"));

app.listen(port,()=>{console.log(`http://localhost:${port}`)})