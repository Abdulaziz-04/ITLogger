require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const { Tech, Logs } = require('./Models');

const mongoUrl =
    process.env.MONGO_URL || (config.has('mongoUrl') ? config.get('mongoUrl') : null);

if (!mongoUrl) {
    console.error('Missing MONGO_URL or config mongoUrl for seeding.');
    process.exit(1);
}

const techSeeds = [
    { firstName: 'Amelia', lastName: 'Chen' },
    { firstName: 'Liam', lastName: 'Patel' },
    { firstName: 'Sofia', lastName: 'Martinez' },
    { firstName: 'Noah', lastName: 'Thompson' },
    { firstName: 'Olivia', lastName: 'Nguyen' },
    { firstName: 'Ethan', lastName: 'Garcia' },
    { firstName: 'Maya', lastName: 'Hernandez' },
    { firstName: 'Caleb', lastName: 'Wong' },
    { firstName: 'Isabella', lastName: 'Davis' },
    { firstName: 'Jack', lastName: 'O’Donnell' },
    { firstName: 'Priya', lastName: 'Raman' },
    { firstName: 'Marcus', lastName: 'Lee' }
];

const categories = ['Network', 'Access', 'Hardware', 'Software', 'Security', 'Cloud'];

const logsSeeds = [
    {
        message: 'Wi‑Fi down on 3rd floor; users dropped from SSID.',
        tech: 'Amelia Chen',
        status: 'in_progress',
        attention: true,
        category: 'Network',
        dt: new Date(Date.now() - 1000 * 60 * 60 * 6)
    },
    {
        message: 'VPN split-tunnel requested for finance apps.',
        tech: 'Liam Patel',
        status: 'open',
        attention: false,
        category: 'Network',
        dt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
        message: 'Laptop fan noise reported; schedule hardware check.',
        tech: 'Sofia Martinez',
        status: 'open',
        attention: false,
        category: 'Hardware',
        dt: new Date(Date.now() - 1000 * 60 * 60 * 12)
    },
    {
        message: 'Password reset requested after lockout.',
        tech: 'Noah Thompson',
        status: 'resolved',
        attention: false,
        category: 'Access',
        dt: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        message: 'Outlook search index broken for shared mailbox.',
        tech: 'Olivia Nguyen',
        status: 'in_progress',
        attention: true,
        category: 'Software',
        dt: new Date(Date.now() - 1000 * 60 * 90)
    },
    {
        message: 'Printer queue jammed in West Wing; cleared jobs.',
        tech: 'Ethan Garcia',
        status: 'resolved',
        attention: false,
        category: 'Hardware',
        dt: new Date(Date.now() - 1000 * 60 * 180)
    },
    {
        message: 'Okta MFA prompt loop on mobile devices.',
        tech: 'Maya Hernandez',
        status: 'in_progress',
        attention: true,
        category: 'Security',
        dt: new Date(Date.now() - 1000 * 60 * 200)
    },
    {
        message: 'New hire onboarding: create AD and email accounts.',
        tech: 'Caleb Wong',
        status: 'open',
        attention: false,
        category: 'Access',
        dt: new Date(Date.now() - 1000 * 60 * 300)
    },
    {
        message: 'Zoom calls dropping; investigate bandwidth shaping.',
        tech: 'Isabella Davis',
        status: 'open',
        attention: true,
        category: 'Network',
        dt: new Date(Date.now() - 1000 * 60 * 400)
    },
    {
        message: 'macOS update stuck at 80%; collect logs.',
        tech: 'Jack O’Donnell',
        status: 'open',
        attention: true,
        category: 'Software',
        dt: new Date(Date.now() - 1000 * 60 * 500)
    },
    {
        message: 'Azure VM patch window completed.',
        tech: 'Priya Raman',
        status: 'resolved',
        attention: false,
        category: 'Cloud',
        dt: new Date(Date.now() - 1000 * 60 * 520)
    },
    {
        message: 'Access badge not working in garage gate.',
        tech: 'Marcus Lee',
        status: 'open',
        attention: true,
        category: 'Access',
        dt: new Date(Date.now() - 1000 * 60 * 600)
    },
    {
        message: 'Endpoint AV definitions stale; pushed update.',
        tech: 'Amelia Chen',
        status: 'resolved',
        attention: false,
        category: 'Security',
        dt: new Date(Date.now() - 1000 * 60 * 650)
    },
    {
        message: 'File server latency during backup window.',
        tech: 'Liam Patel',
        status: 'in_progress',
        attention: true,
        category: 'Network',
        dt: new Date(Date.now() - 1000 * 60 * 700)
    },
    {
        message: 'Chrome extension flagged as malware; removed.',
        tech: 'Sofia Martinez',
        status: 'resolved',
        attention: false,
        category: 'Security',
        dt: new Date(Date.now() - 1000 * 60 * 740)
    },
    {
        message: 'SharePoint permissions change for Ops team.',
        tech: 'Noah Thompson',
        status: 'open',
        attention: false,
        category: 'Access',
        dt: new Date(Date.now() - 1000 * 60 * 820)
    },
    {
        message: 'Teams presence status stuck; collect client logs.',
        tech: 'Olivia Nguyen',
        status: 'open',
        attention: false,
        category: 'Software',
        dt: new Date(Date.now() - 1000 * 60 * 860)
    },
    {
        message: 'Switch stack failover test scheduled.',
        tech: 'Ethan Garcia',
        status: 'open',
        attention: true,
        category: 'Network',
        dt: new Date(Date.now() - 1000 * 60 * 900)
    },
    {
        message: 'HR portal 500 errors after deploy; rolling back.',
        tech: 'Maya Hernandez',
        status: 'in_progress',
        attention: true,
        category: 'Software',
        dt: new Date(Date.now() - 1000 * 60 * 1000)
    },
    {
        message: 'TLS cert renewal completed on intranet.',
        tech: 'Caleb Wong',
        status: 'resolved',
        attention: false,
        category: 'Security',
        dt: new Date(Date.now() - 1000 * 60 * 1100)
    }
];

(async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected to Mongo, seeding data...');

        await Tech.deleteMany({});
        await Logs.deleteMany({});

        const techDocs = await Tech.insertMany(techSeeds);
        console.log(`Inserted ${techDocs.length} technicians`);

        const logsDocs = await Logs.insertMany(
            logsSeeds.map(log => ({
                ...log,
                category: log.category || categories[Math.floor(Math.random() * categories.length)]
            }))
        );
        console.log(`Inserted ${logsDocs.length} logs`);

        await mongoose.connection.close();
        console.log('Done.');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
