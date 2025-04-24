import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        console.log('Decoded Token:', tokenDecode); // Ensure it includes _id

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            req.seller = tokenDecode;  // Attach the decoded token (including _id) to req.seller
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }
    } catch (error) {
        console.error('Error in authSeller:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


export default authSeller;



