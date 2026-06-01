const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
    // Create transporter (using Gmail as default or Custom SMTP if configured)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'lawbridge.verify@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password',
        },
    });

    // Elegant Dark Green and Cream themed HTML template
    const mailOptions = {
        from: `"LawBridge Verification" <${process.env.EMAIL_USER || 'lawbridge.verify@gmail.com'}>`,
        to: email,
        subject: 'Verify Your LawBridge Account',
        html: `
            <div style="font-family: 'Poppins', Helvetica, Arial, sans-serif; background-color: #F8FAF9; padding: 40px 20px; text-align: center; color: #1e293b;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; box-shadow: 0 10px 30px rgba(3, 43, 33, 0.05); overflow: hidden; border: 1px solid #e2e8f0;">
                    <!-- Header Banner -->
                    <div style="background: linear-gradient(135deg, #064e3b, #032b21); padding: 40px 20px; color: #ffffff; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 800; tracking: tight;">LawBridge</h1>
                        <p style="margin: 5px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #a7f3d0;">Secure Registration</p>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px 30px; text-align: center;">
                        <h2 style="margin-top: 0; font-size: 22px; font-weight: 700; color: #0f172a;">Verify Your Account</h2>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 30px;">
                            Thank you for joining LawBridge. Use the secure 6-digit OTP below to verify and activate your account.
                        </p>
                        
                        <!-- OTP Box -->
                        <div style="background-color: #f0fdf4; border: 2px dashed #10b981; border-radius: 16px; padding: 20px 40px; display: inline-block; margin-bottom: 30px;">
                            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #047857; font-family: monospace;">${otp}</span>
                        </div>
                        
                        <p style="font-size: 13px; color: #94a3b8; margin: 0 0 10px 0;">
                            This OTP is highly secure and is valid for <strong>5 minutes</strong>.
                        </p>
                        <p style="font-size: 12px; color: #cbd5e1; margin: 0;">
                            If you did not request this, please ignore this email.
                        </p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                        © ${new Date().getFullYear()} LawBridge. All rights reserved.
                    </div>
                </div>
            </div>
        `,
    };

    // Fallback: If no real credentials are set, log to terminal so testing works flawlessly
    if (!process.env.EMAIL_USER || process.env.EMAIL_PASS === 'your-app-password') {
        console.log('\n======================================');
        console.log(`[OTP EMAIL DEV MODE] SMTP credentials not set.`);
        console.log(`To: ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log('======================================\n');
        return true; 
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Nodemailer SMTP failed. Falling back to Console Log in local dev mode:', err.message);
        console.log('\n======================================');
        console.log(`[OTP EMAIL FALLBACK] SMTP Error: ${err.message}`);
        console.log(`To: ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log('======================================\n');
    }
};

module.exports = { sendOTPEmail };
