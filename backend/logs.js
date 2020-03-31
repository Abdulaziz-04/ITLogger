const exp = require('express');
const router = exp.Router();
const { Logs } = require('./Models');

router.get('/', async (req, res) => {
    const data = await Logs.find().sort('date');

    if (!data) return res.status(404).json({ msg: 'Nothing to Display...' });
    res.json(data);
});

router.post('/', async (req, res) => {
    const { message, attention, dt, tech } = req.body;
    const data = new Logs({
        message,
        attention,
        dt,
        tech
    });
    await data.save();
    res.json(data);
});

router.put('/:id', async (req, res) => {
    const { message, attention, dt, tech } = req.body;
    const data = await Logs.findByIdAndUpdate(
        req.params.id,
        { message, attention, dt, tech },
        { new: true }
    );
    if (!data) return res.status(404).json({ msg: 'Specified log not found' });
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    const data = await Logs.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ msg: 'Specified log not found' });
    res.json(data);
});

module.exports = router;
