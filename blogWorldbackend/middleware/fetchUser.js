const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

const fetchUser = (req, res, next) => {
    // Taking User Authentication Token
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Auth token not found" });
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