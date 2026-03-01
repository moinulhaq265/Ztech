const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
};
