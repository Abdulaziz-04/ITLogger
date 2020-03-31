const exp = require('express');
const app = exp();
const db = require('mongoose');
const config = require('config');
const tech = require('./backend/tech');
const logs = require('./backend/logs');
const path = require('path');

db.connect(config.get('mongoUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error(err.message));

app.use(exp.json());

app.use('/techs', tech);
app.use('/logs', logs);
if (process.env.NODE_ENV === 'production') {
    app.use(exp.static('frontend/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
