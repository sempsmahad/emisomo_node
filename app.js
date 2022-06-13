require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// // Swagger
// const swaggerUI = require('swagger-ui-express')
// const YAML = require('yamljs')
// const swaggerDocument = YAML.load('./swagger.yaml')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const connectDB = require('./db/connect')

// USE V2
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// routers
const productRouter = require('./routes/productRoutes')
const summonRouter = require('./routes/summonRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)

// app.use(express.static('./public'))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(fileUpload({ useTempFiles: true }))

app.get('/', (req, res) => {
  res.send('<h1>Sautil Islamiyah</h1>')
})

// routes
app.use('/api/v1/products', productRouter)
app.use('/api/v1/summons', summonRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
