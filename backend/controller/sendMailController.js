const nodemailer = require('nodemailer');
require('dotenv').config();

const sendSignupEmail = async (name, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Darjeeling Homestay" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Darjeeling Homestay',
        html: `
            <h3>Hi ${name},</h3>
            <p>Thanks for signing up with Darjeeling Homestay!</p>
            <p>We’re thrilled to have you on board 😊</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendSignupEmail;
