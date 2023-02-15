import mongoose from 'mongoose'

const Schema = mongoose.Schema

interface User {
    username: string
    email: string
    password: string
    avatar: string
}

const UserSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    avatar: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
