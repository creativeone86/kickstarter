const functions = require('firebase-functions');
const Nexmo = require('nexmo');
const express = require('express');
const cors = require('cors');
const app = express();
const nexmo = new Nexmo({
	apiKey: 'f0d1d164',
	apiSecret: 'Pr1EpWF9li9zUyNo'
});

// Automatically allow cross-origin requests
app.use(cors());

app.get('/', (req, res) => {
	res.json({msg: 'ok'});
	}
	// 	const message = {
	// 		content: {
	// 			type: 'text',
	// 			text: 'Hello world from test!',
	// 		},
	// 	};
	//
	// nexmo.channel.send(
	// 		{type: 'viber_service_msg', number: '359895787283'},
	// 		{type: 'viber_service_msg', id: '495a683f77e7d3e2-9f547bd27f279b98-a8cf3527d7dab2bf'},
	// 		message,
	// 		(err, data) => {
	// 			res.json({msg: data.message_uuid});
	// 		}
	// 	);
	// }
);

// Expose Express API as a single Cloud Function:
exports.handler = functions.https.onRequest(app);
