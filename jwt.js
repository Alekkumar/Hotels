const jwt = require("jsonwebtoken");


const jwtauthmiddleware = (req, res, next) => {

    //first check
    const authazation = req.headers.authorization;
    if (!authazation) return res.status(401).json({ Error: "Token not found." })
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ Error: 'UNAUTHORIZATION' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (Error) {
        console.log(Error);
        return res.status(401).json({ Error: 'INVALID TOKEN' });
    }
};

const generatetoken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000000000000 });
}
module.exports = { jwtauthmiddleware, generatetoken };