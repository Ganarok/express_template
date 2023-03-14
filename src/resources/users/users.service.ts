import User from '@/models/User'
import dbConnect from '@/lib/dbConnect'

export class UsersService {
    async getUsers( filters: object ) {
        await dbConnect()
        return User
            .find(filters)
            .lean()
    }

    async createUser( data: object ) {
        await dbConnect()
        return User
            .create(data)
    }
    
    async getUser( filters: object ) {
        await dbConnect()
        return User
            .findOne(filters)
            .lean()
    }

    async getUserbyId( id: string ) {
        await dbConnect()
        return User
            .findById(id)
            .lean()
    }

    async updateUserById( id: string, data: object ) {
        await dbConnect()
        return User
            .findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            })
    }

    async deleteUserById( id: string ) {
        await dbConnect()
        return User.deleteOne({ _id: id })
    }
}