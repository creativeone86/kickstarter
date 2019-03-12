const functions = require('firebase-functions');
const Nexmo = require('nexmo');
const express = require('express');
const cors = require('cors');
const app = express();
const nexmo = new Nexmo({
	apiKey: 'f0d1d164',
	apiSecret: 'Pr1EpWF9li9zUyNo',
	// applicationId: APP_ID,
	// privateKey: PRIVATE_KEY_PATH,
});

// Automatically allow cross-origin requests
app.use(cors());
// app.options('/', cors()); //
// app.options('*', cors()); // include before other routes

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.get('/', (req, res) => {
	nexmo.message.sendSms('dna-soft', '359895787283', 'Еха и смс-ите работят', {type: 'unicode'}, (data) => {
		console.log('@data', data);
		res.json({msg: 'sent message'});
	});
	}
);
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

// Expose Express API as a single Cloud Function:
exports.handler = functions.https.onRequest(app);
