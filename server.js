import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/book-event', async(req, res) => {
    const {name,  email} = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_GMAIL,
            pass: process.env.ADMIN_PASS
        }
    });

    const mailToClient = {
        from: process.env.ADMIN_GMAIL,
        to: email,
        subject: 'Booking Confirmation For NEVAS AI Event',
        text: `Hi ${name} Thank You For Showing Your In NEVAS AI Event`
    }

    const mailToAdmin = {
        from: process.env.ADMIN_GMAIL,
        to: process.env.ADMIN_GMAIL,
        subject: 'Hi Guys We Got a Lead For Nevas AI Event',
        text: `${name} ${email}`
    }

    try {
        await transporter.sendMail(mailToClient);
        await transporter.sendMail(mailToAdmin);

        res.json({ message: 'Booking Successfull! Confirmation email sent.' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Sending Gmail.' })
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{ console.log(`Server Running On http://localhost:${PORT}`);
})