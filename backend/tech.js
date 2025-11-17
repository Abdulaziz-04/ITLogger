const exp = require('express');
const router = exp.Router();
const { Tech, validateTech } = require('./Models');

router.get('/', async (_req, res) => {
    try {
        const data = await Tech.find().sort('firstName');
        if (!data) return res.json({ msg: 'Nothing to display...' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to fetch technicians', error: err.message });
    }
});

router.post('/', async (req, res) => {
    const result = validateTech(req.body);
    if (result.error)
        return res.status(400).json({ msg: result.error.details[0].message });
    try {
        const data = new Tech({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        await data.save();
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to create technician', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Tech.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ msg: 'Specified tech not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Unable to delete technician', error: err.message });
    }
});

module.exports = router;
