const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const Email = require('./email')

require('dotenv').config()

const app = express()

app.use(morgan('dev'))

app.use(
	express.json({
		limit: '50kb',
	})
)
app.use(
	express.urlencoded({
		extended: true,
		limit: '50kb',
	})
)

const corsOptions =
	process.env.NODE_ENV === 'production'
		? {
				origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_WWW],
				credentials: true,
		  }
		: {
				origin: [process.env.CORS_ORIGIN],
				credentials: true,
		  }

app.use(cors(corsOptions))
app.options('*', cors())

app.post('/api/sendEmail', async (req, res, next) => {
	const { name, email, desc, phone, sendCopy } = req.body

	if (name && email && desc && phone) {
		const mail = new Email({ name, email, desc, phone })
		await mail.sendToAdmin()

		if (sendCopy) {
			await mail.sendCopy()
		}

		res.status(200).json({
			status: 'success',
			message: `attempted to send email with following params: ${name}, ${email}, ${desc}`,
		})
	} else {
		res.status(400).json({
			status: 'failed',
			message: 'Name, email, phone and desc are required fields',
		})
	}
})

module.exports = app
