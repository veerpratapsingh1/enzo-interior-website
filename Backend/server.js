const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("EMAIL USER:", process.env.EMAIL_USER ? "OK" : "MISSING");
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: "veerpratapsingh0011@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});