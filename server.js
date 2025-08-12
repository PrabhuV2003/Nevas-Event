import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/book-event', async(req, res) => {
    const {name, email, phone, company, message} = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_OUTLOOK,
            pass: process.env.ADMIN_PASS
        }
    });

    const mailToClient = {
        from: process.env.ADMIN_OUTLOOK,
        to: email,
        subject: 'Booking Confirmation For NEVAS AI Event',
        html:  `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <img src="https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg" alt="Event Banner" style="width: 100%; height: auto; object-fit: cover;">
                <div style="padding: 20px;">
                <img src="https://res.cloudinary.com/ddvsj2zxd/image/upload/v1753435753/logo_womtni.png" alt="NEVAS AI Logo" style="margin-bottom: 20px; object-fit: cover;">
                <h2 style="color: #333;">Hi ${name},</h2>
                <p style="font-size: 16px; color: #555;">Thank you for booking your spot for the <strong>NEVAS AI Event</strong>! We’re excited to have you join us.</p>
                <p style="font-size: 16px; color: #555;">We’ll be in touch with more details soon.</p>
                <p style="font-size: 16px; color: #555;">Best regards,<br/>NEVAS AI Team</p>
                </div>
                <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} NEVAS AI. All rights reserved.
                </div>
            </div>
      `
    }

    const mailToAdmin = {
        from: process.env.ADMIN_OUTLOOK,
        to: process.env.FORWARD_OUTLOOK,
        subject: 'New Lead: NEVAS AI Event Booking',
        html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="padding: 20px;">
                <h2 style="color: #333;">New Event Booking</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Message:</strong> ${message}</p>
                </div>
                <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} NEVAS AI.
                </div>
            </div>
        `
    }

    try {
        
        await Promise.all([
            transporter.sendMail(mailToClient),
            transporter.sendMail(mailToAdmin)
        ]);
        
        res.json({ message: 'Booking Submit Successfully!' })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Sending Gmail.' })
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{ console.log(`Server Running On http://localhost:${PORT}`);
});