const exp = require('express');
const router = exp.Router();
const { Tech, validateTech } = require('./Models');

router.get('/', async (req, res) => {
    const data = await Tech.find().sort('firstName');
    if (!data) return res.json({ msg: 'Nothing to Display...' });
    res.json(data);
});

router.post('/', async (req, res) => {
    const result = validateTech(req.body);
    if (result.error)
        return res.status(400).json({ msg: result.error.details[0].message });
    const data = new Tech({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    await data.save();
    res.json(data);
});

/*router.put('/:id', async (req, res) => {
    const result = validateTech(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    const data = await Tech.findByIdAndUpdate(
        req.params.id,
        { firstName: req.body.firstName, lastName: req.body.lastName },
        {
            new: true
        }
    );
    if (!data) return res.status(404).json({ msg: 'Specified tech not found' });
    await data.save();
    res.json(data);
});*/

router.delete('/:id', async (req, res) => {
    const data = await Tech.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ msg: 'Specified tech not found' });
    res.json(data);
});

module.exports = router;
