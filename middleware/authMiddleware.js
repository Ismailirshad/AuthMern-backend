import jwt from 'jsonwebtoken';


const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('User ID:', tokenDecode.id); 

        if (tokenDecode.id) {
            req.userId = tokenDecode.id
        } else {
            return res.status(500).json({ success: false, message: 'Not Authorized Login again' })
        }
        next();

    } catch (error) {
        console.log("error in controller", error)
        res.status(500).json({ success: false, message: error.message });
    }
}

export default userAuth;