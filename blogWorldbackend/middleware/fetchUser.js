const jwt = require("jsonwebtoken");
const JWT_TOKEN = "Bratadipta02947@#$";

const fetchUser = (req, res, next) => {
    // Taking User Authentication Token
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Plaese use valid Auth token" });
    }

    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please Authenticate with valid token" });
    }
}

module.exports = fetchUser;