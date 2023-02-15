import User from '@/models/User'

export class UsersService {
    getUsers( filters: object ) {
        return User
            .find(filters)
            .lean()
    }
    
    getUser( filters: object ) {
        return User
            .findOne(filters)
            .lean()
    }

    getUserbyId( id: string ) {
        return User
            .findById(id)
            .lean()
    }

    updateUserById( id: string, data: object ) {
        return User
            .findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            })
    }

    deleteUserById( id: string ) {
        return User.deleteOne(id)
    }
}