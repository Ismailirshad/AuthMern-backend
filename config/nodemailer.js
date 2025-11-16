import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   service:'gmail',
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    }
})

transporter.verify(function(err, success) {
    if (err) console.log('SMTP Verification Error:', err);
    else console.log('SMTP Server ready to send emails');
});


export default transporter;