import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';
import { EMAIL_VERIFY_TEMPLATE } from '../config/emailTemplate.js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashedpassword
        })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })

        // Sending welcome email
        try {
            
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'welcome to MernAuth',
                text: `Welcome to MernAuth! You have successfully registered with email id: ${email}. Please login to continue.`
            }
    
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
        }

        // await resend.emails.send({
        //     from: "MernAuth <onboarding@resend.dev>",
        //     to: email,
        //     subject: "Welcome to MernAuth",
        //     text: `Welcome to MernAuth! You have successfully registered with email: ${email}. Please login to continue.`,
        // });

        res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ Success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })
        return res.status(200).json({ success: true, message: "User logged in successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        })
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//send verification otp to the users email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.userId ? { userId: req.userId } : req.body;
        console.log("here i ", userId)

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        try {
            
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Verify your email',
                html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
    
            }
    
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error)
        }

        // await resend.emails.send({
        //     from: "Auth App <onboarding@resend.dev>",
        //     to: user.email,
        //     subject: "Verify your Email",
        //     html: EMAIL_VERIFY_TEMPLATE
        //         .replace("{{otp}}", otp)
        //         .replace("{{email}}", user.email),
        // });
        res.status(200).json({ success: true, message: "Verification OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {

    const { otp } = req.body;
    const { userId } = req.userId ? { userId: req.userId } : req.body;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Missing Details" })
    } try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.verifyOtp !== otp || user.verifyOtp === '') {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: "User is authenticated" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Missing email" })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset your password',
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions);

        // await resend.emails.send({
        //     from: "Auth App <onboarding@resend.dev>",
        //     to: user.email,
        //     subject: "Reset your password",
        //     html: EMAIL_VERIFY_TEMPLATE
        //         .replace("{{otp}}", otp)
        //         .replace("{{email}}", user.email),
        // });

        res.status(200).json({ success: true, message: "Reset OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Missing details" })
    }

    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (user.resetOtp == '' || user.resetOtp != otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}