const connectDB = require('./_db');
const Application = require('./_models/Application');
const auth = require('./_middleware/auth');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const decoded = auth(req, res);
    if (!decoded) return;

    await connectDB();

    if (req.method === 'GET') {
        try {
            const apps = await Application.find().sort({ createdAt: -1 });
            res.json(apps);
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, status } = req.body;
            // Support both URL param style (if we were using a real router) and body style for serverless simplicity
            const appId = id || req.query.id;
            const app = await Application.findByIdAndUpdate(appId, { status }, { new: true });
            res.json(app);
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
