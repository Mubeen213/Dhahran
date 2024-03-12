import nodemailer from "nodemailer";

export const sendVerificationEmail = async ({name, email, verificationToken, origin}) => {

    console.log(`Sending verification email with email ${email} and origin ${origin}`)
    const verifyEmail = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;

    return sendEmail({
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
    });
}

export const sendEmail = async ({to, subject, html}) => {

    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jordan.lockman@ethereal.email',
            pass: 'ZbmNDWarEarnutSVTm'
        }
    });

    return transporter.sendMail({
        from: ' "Md Mubeen" ',
        to,
        subject,
        html
    })
}