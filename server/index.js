import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRouter from './routes/user.js'
import documentRouter from './routes/document.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'
import { register } from './controllers/user.js'
import multer from 'multer'
import { fileURLToPath } from 'url'

// CONFIGURATION
const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors({
	origin: 'http://127.0.0.1:5173',
	credentials: true
}))




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dest = path.join(__dirname, '../client/public/Images');
		cb(null, dest);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	}
});

app.use("/assets", express.static(path.join(__dirname, "/public/assets")))

const upload = multer({ storage: storage });



app.use((req, res, next) => {
	console.log(req.path, req.method, res.json)
	next()
})

// ROUTES
app.use('/document', documentRouter)
app.use('/user', userRouter)
app.post('/user/register', register)


// DATABASE CONFIGURATION
const PORT = process.env.PORT || 2300
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`))