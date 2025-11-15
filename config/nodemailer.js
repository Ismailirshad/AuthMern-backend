import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port:587,
//      secure: false,
//     auth: {
//         user:process.env.SMTP_USER,
//         pass:process.env.SMTP_PASS,
//     }
// })

// export default transporter;

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false // allows self-signed certs
    },
    connectionTimeout: 10000 // 10 seconds timeout
});

transporter.verify(function(error, success) {
   if (error) {
        console.error('SMTP Verification Error:', error);
   } else {
        console.log('SMTP Server is ready to send messages');
   }
});
export default transporter
