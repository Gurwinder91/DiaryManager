const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const serviceAccount = require("./dairy-management-system-9191.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dairy-management-system-9191.firebaseio.com"
});

exports.disableUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        admin.auth().getUserByEmail(request.body.email)
            .then(user => user.toJSON())
            .then(user => admin.auth().updateUser(user.uid, { disabled: request.body.disabled }))
            .then(() => {
                const message = request.body.disabled ? 'User is disabled' : 'User is enabled';
                console.log(message);
                return response.status(200).json({ message: message });
            })
            .catch((err) => response.status(500).json({ error: err }))
    });
});

