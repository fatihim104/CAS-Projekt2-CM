const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require("firebase-admin")
admin.initializeApp()


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'fatihimal@gmail.com',
        pass: 'wocw xvet mfot wdtk'
    }
});

exports.sendWelcomeEmail = functions.firestore.document('participants/{participantId}').onCreate(async (snap, context) => {
    const participant = snap.data();

    try {
        const resetLink = await admin.auth().generatePasswordResetLink(participant.email);

        const mailOptions = {
            from: `"Course Registration" <${functions.config().gmail.email}>`,
            to: participant.email,
            subject: 'Your Registration completed succesfully!',
            html: `<h3>Hello, ${participant.email} !</h3>
            <p> For login and take a look your account you can click this link and reset your password with your ${participant.email} mail:</p><p><a href="${resetLink}">Reset link...</a></p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Mail sendet: %s', mailOptions.to);
    } catch (error) {
        console.error("There is an error by mail sending or reset link:", error);
    }
});
