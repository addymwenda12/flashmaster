import nodemailer from 'nodemailer';
import cron from 'node-cron';

/* CONFIGURATION */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

/* FUNCTIONS TO SEND EMAIL NOTIFICATIONS */
async function sendEmailNotification(to, subject, text) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

/* SCHEDULED TASK TO SEND EMAIL NOTIFICATIONS */
function scheduleNotifications(cronExpression, callback) {
  cron.schedule(cronExpression, callback);
}

export default {
  sendEmailNotification,
  scheduleNotifications,
};