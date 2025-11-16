import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//    service:'gmail',
//     auth: {
//         user:process.env.SMTP_USER,
//         pass:process.env.SMTP_PASS,
//     }
// })
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // literally the word 'apikey'
    pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
  },
});

transporter.verify(function(err, success) {
    if (err) console.log('SMTP Verification Error:', err);
    else console.log('SMTP Server ready to send emails');
});


export default transporter;