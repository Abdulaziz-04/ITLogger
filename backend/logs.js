const exp = require('express');
const router = exp.Router();
const { Logs } = require('./Models');

const validateLog = body => {
    if (!body.message || !body.tech) {
        return 'Message and technician are required.';
    }
    if (body.status && !['open', 'in_progress', 'resolved'].includes(body.status)) {
        return 'Invalid status value.';
    }
    return null;
};

router.get('/', async (_req, res) => {
    try {
        const data = await Logs.find().sort({ dt: -1 });
        if (!data) {
            return res.status(404).json({ msg: 'Nothing to display...' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch logs', error: err.message });
    }
});

router.post('/', async (req, res) => {
    const error = validateLog(req.body);
    if (error) return res.status(400).json({ msg: error });

    try {
        const { message, attention, dt, tech, status } = req.body;
        const data = new Logs({
            message,
            attention,
            dt,
            tech,
            status
        });
        await data.save();
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to create log', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const error = validateLog(req.body);
    if (error) return res.status(400).json({ msg: error });

    try {
        const { message, attention, dt, tech, status } = req.body;
        const data = await Logs.findByIdAndUpdate(
            req.params.id,
            { message, attention, dt, tech, status, updatedAt: Date.now() },
            { new: true }
        );
        if (!data) return res.status(404).json({ msg: 'Specified log not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to update log', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Logs.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ msg: 'Specified log not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to delete log', error: err.message });
    }
});

module.exports = router;
