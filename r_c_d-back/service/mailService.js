import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_SUPPORT_LOGIN,
        pass: process.env.MAIL_SUPPORT_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.MAIL_SUPPORT_LOGIN,
      to,
      subject: '<bold>активация аккаунта R_C_D</bold>',
      text: '',
      html: `
        <div>
          <h1>shalom</h1>
          <a href="${link}">${link}</a>
        </div>`,
    });
  }
}

export default new MailService();
