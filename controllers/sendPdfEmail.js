const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const sendPdfEmail = async (req, res) => {
  const email = req.body.email;
  const auth = {
    auth: {
      api_key: process.env.EMAIL_SEND_API_KEY,
      domain: process.env.EMAIL_SEND_DOMAIN,
    },
  };
  try {
    const transporter = nodemailer.createTransport(mg(auth));
    await transporter.sendMail({
      from: "nurul.cse7@gmail.com", // verified sender email
      to: email || "ph03b6@gmail.com", // recipient email
      subject: `Your template is done`, // Subject line
      text: "Hello world!", // plain text body
      html: `
          <h3>Your template is edited done</h3>
          <div>
              <p>You perfectly edited done and can download also we are sent an email with PDF copy</p>
              <p>Please visit our web https://unique-resume.vercel.app/</p>
              <p>Thanks for using Unique Resume</p>
          </div> `, // html body
    });
    res.status(200).send("email send");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = sendPdfEmail;

// ***************Send email Nodemailer/mail-gun stop here *************

// send email when user download their Resume, CV or cover letter as a PDF.
// sendPdfEmail();

// const { email, treatment, appointmentDate, slot } = booking;
