require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const path = require('path');

const tech = require('./backend/tech');
const logs = require('./backend/logs');

const app = express();

const resolveMongoUrl = () => {
    let mongoUrl = process.env.MONGO_URL;
    try {
        if (!mongoUrl && config.has('mongoUrl')) {
            mongoUrl = config.get('mongoUrl');
        }
    } catch (err) {
        // swallow missing config file errors so the app can still boot with env vars
    }
    if (!mongoUrl) {
        throw new Error(
            'Missing mongo connection string. Set MONGO_URL env variable or config mongoUrl.'
        );
    }
    return mongoUrl;
};

mongoose.set('strictQuery', true);
mongoose
    .connect(resolveMongoUrl())
    .then(() => console.log('Connected to the database'))
    .catch(err => {
        console.error('Mongo connection failed', err.message);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());

app.use('/techs', tech);
app.use('/logs', logs);

if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, 'front', 'build');
    app.use(express.static(buildPath));
    app.get('*', (_req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
