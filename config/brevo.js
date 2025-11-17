// import nodemailer from 'nodemailer';

// // const transporter = nodemailer.createTransport({
// //    service:'gmail',
// //     auth: {
// //         user:process.env.SMTP_USER,
// //         pass:process.env.SMTP_PASS,
// //     }
// // })
// const transporter = nodemailer.createTransport({
//   host: 'smtp.sendgrid.net',
//   port: 587,
//   auth: {
//     user: 'apikey', // literally the word 'apikey'
//     pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
//   },
// });

// transporter.verify(function(err, success) {
//     if (err) console.log('SMTP Verification Error:', err);
//     else console.log('SMTP Server ready to send emails');
// });


// export default transporter;

import SibApiV3Sdk from "@getbrevo/brevo";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();

export default brevo;



// import SibApiV3Sdk from "@getbrevo/brevo";

// const client = new SibApiV3Sdk.TransactionalEmailsApi();
// client.apiKey = process.env.BREVO_API_KEY;

// export default client;

