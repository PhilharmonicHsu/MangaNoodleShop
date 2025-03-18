// Create your server
import express, {Request, Response} from 'express'
import cookieSession from 'cookie-session'
import receiptRouter from './routes/receipt.routes'
import bannerRouter from './routes/banner.routes'
import dotenv from 'dotenv'
import cors from 'cors'
import cartRouter from './routes/cartItem.route'
dotenv.config()

const app = express();

// Middleware
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing cookie keys!")
}
app.use(cookieSession({
  name: 'session',
  keys: [
    SIGN_KEY,
    ENCRYPT_KEY
  ],
  maxAge: 5 * 60 * 1000
}))
app.use(cors({
    origin: 'http://localhost:4321',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/receipts', receiptRouter)
app.use('/banners', bannerRouter)
app.use('/cart-items', cartRouter)


app.use((request: Request, response: Response) => {
    response.status(404).send("Page not found!")
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})