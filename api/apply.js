const connectDB = require('./_db');
const Application = require('./_models/Application');

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

    await connectDB();

    try {
        const { name, email, contact, portfolio, course, type } = req.body;

        const newApplication = new Application({
            name,
            email,
            contact,
            portfolio,
            course,
            type
        });

        const savedApplication = await newApplication.save();
        res.status(201).json({ success: true, message: 'Transmission Received!', data: savedApplication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Nexus Sync Error' });
    }
};
