const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const express = require('express');
const cors = require('cors');
const app = express();

// Automatically allow cross-origin requests
app.use(cors());
// app.options('/', cors()); //
// app.options('*', cors()); // include before other routes

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.post('/', (req, res) => {
		const {to, message} = req.body.data;
		sgMail.setApiKey('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');
		const msg = {
			to,
			from: 'noreply@os-wizard.com',
			subject: 'Тестов mail',
			html: `<strong>${message}</strong>`,
		};
		sgMail.send(msg).then(data => res.json({data: {message: 'ok'}}));
	}
);
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

// Expose Express API as a single Cloud Function:
exports.handler = functions.https.onRequest(app);