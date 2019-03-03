const functions = require('firebase-functions')
const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


// 2. Admin SDK can only be initialized once
try {
	admin.initializeApp(functions.config().firebase)
} catch(e) {
	console.log('dbCompaniesOnUpdate initializeApp failure')
}

// 3. Google Cloud environment variable used:
// firebase functions:config:set postmark.key="API-KEY-HERE"
// const postmarkKey = functions.config().postmark.key
// todo auth

// 4. Watch for new users
exports = module.exports = functions.firestore.document('/contacts/{uid}').onUpdate((event) => {
	const snapshot = event.data
	const user = snapshot.val()
	// Use nodemailer to send email
	return sendEmail(user);
})

function sendEmail(user) {
	// 5. Send welcome email to new users
	// const mailOptions = {
	// 	from: '"Dave" <dave@example.net>',
	// 	to: '${user.email}',
	// 	subject: 'Welcome!',
	// 	html: `<YOUR-WELCOME-MESSAGE-HERE>`
	// }
	// 6. Process the sending of this email via nodemailer
	// return mailTransport.sendMail(mailOptions)
	// 	.then(() => console.log('dbCompaniesOnUpdate:Welcome confirmation email'))
	// 	.catch((error) => console.error('There was an error while sending the email:', error))

	const msg = {
		to: 'test@example.com',
		from: 'test@example.com',
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	sgMail.send(msg);
}