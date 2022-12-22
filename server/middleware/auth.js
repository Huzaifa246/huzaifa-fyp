import { verify } from "jsonwebtoken";

export const auth = async (req, res, next) => {
    let token = req.get('Authorization');

    if (!token) return res.status(403).json("Unauthorized action!");

    try {
        // slicing Bearer "token string"
        token = token.slice(7);
        verify(token, process.env.JWTPRIVATEKEY, (error) => {
            if (error) return res.status(401).json({ success: false, message: "Invalid Token" });
            req.user = user;
            console.log(req.user);
            next();
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}