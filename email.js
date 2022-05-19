const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
const pug = require('pug')
const path = require('path')

class Email {
	constructor(formInfo) {
		this.email = formInfo.email
		this.name = formInfo.name
		this.desc = formInfo.desc
		this.phone = formInfo.phone
		this.from = `${process.env.SITE_TITLE} <${process.env.EMAIL_FROM}>`
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// sendgrid or sendinblue
		}

		return nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async send(template, subject, options = { copy: false }) {
		const html = pug.renderFile(
			path.resolve(__dirname, 'templates/', `${template}.pug`),
			{
				name: this.name,
				email: this.email,
				desc: this.desc,
				phone: this.phone,
			}
		)

		const mailOptions = {
			from: this.from,
			to: options.copy ? this.email : process.env.MASTER_EMAIL,
			subject,
			html,
			text: htmlToText.htmlToText(html),
		}

		return await this.newTransport().sendMail(mailOptions)
	}

	async sendToAdmin() {
		return await this.send('main', `New email from your portfolio site`)
	}

	async sendCopy() {
		return await this.send('copy', `Your email to ${process.env.SITE_TITLE}`, {
			copy: true,
		})
	}
}

module.exports = Email
