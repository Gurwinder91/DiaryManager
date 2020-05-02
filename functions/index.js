const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();

const serviceAccount = require("./dairy-management-system-9191.json");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dairy-management-system-9191.firebaseio.com"
});

app.post('/create', (req, res) => {
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.name,
    })
        .then(userRecord => {
            console.log('Successfully created new user:', userRecord.uid);
            return res.status(200).json(userRecord);
        })
        .catch(error => {
            console.error('Error creating new user:', error);
            return res.status(500).json({ error: error })
        });
});

app.post('/disable', (req, res) => {
    admin.auth().getUserByEmail(req.body.email)
        .then(user => user.toJSON())
        .then(user => admin.auth().updateUser(user.uid, { disabled: req.body.disabled }))
        .then(() => {
            const message = req.body.disabled ? 'User is disabled' : 'User is enabled';
            console.log(message);
            return res.status(200).json({ message: message });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: error })
        })
})

exports.manageUser = functions.https.onRequest(app);
