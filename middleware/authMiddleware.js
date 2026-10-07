const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            console.log("Token:", token);
            console.log("JWT_SECRET:", process.env.JWT_SECRET);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded:", decoded);

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            return next();
        }

        return res.status(401).json({ message: "No token, authorization denied" });
    } catch (error) {
        console.log("Auth error:", error.message);
        return res.status(401).json({ message: error.message });
    }
};

module.exports = protect;