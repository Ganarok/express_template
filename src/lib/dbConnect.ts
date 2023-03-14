import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_HOST, MONGODB_PROTOCOL, MONGODB_USER, MONGODB_PASSWORD } = process.env
const MONGODB_URI = `${MONGODB_PROTOCOL}://${MONGODB_USER && MONGODB_PASSWORD ? `${MONGODB_USER}:${MONGODB_PASSWORD}` : ''}${MONGODB_HOST}`

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

declare global {
    var mongoose: any;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn
    }    

    if (!cached.promise) {
        console.log('Connection to database')

        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        }

        mongoose.set('strictQuery', false)
        cached.promise = await mongoose.connect(MONGODB_URI, opts)            
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect
