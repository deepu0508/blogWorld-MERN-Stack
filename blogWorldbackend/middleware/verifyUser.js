const jwt = require("jsonwebtoken");
const F_JWT_TOKEN = process.env.F_JWT_TOKEN;

const verifyUser = (req, res, next) => {
    const token = req.header("bw_auth_token");
    if (!token)
      return res.status(401).json({ error: "BW Auth Token not found" });

    try {
      const data = jwt.verify(token, F_JWT_TOKEN);
      req.exp = data.exp;
      next();
    } catch (err) {
        res.status(401).json({errors:"Invalid or Expire BW Auth Token"})
    }
};

module.exports = verifyUser;
