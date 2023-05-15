const nodemailer = require('nodemailer');

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: 'gmail', //i use outlook
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mirza.kohkan@gmail.com", // email
      pass: "isynvmkdooojccww", //password
    },
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// send email
const EmailSender = ({ fullName, email, phone, message}) => {
  const options = {
    from: email,
    to: "mirza.kohkan@gmail.com",
    subject: 'Message From Shoeshop Store',
    text: message,
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #00efbc; padding: 20px 0">          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form New Customer
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Phone: <b>${phone}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options)
};

module.exports =  EmailSender