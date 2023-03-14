import { expect } from "chai"
import { ObjectId } from "mongoose"

import { UsersService } from "@/resources/users/users.service"

export default function users() {
    const Service = new UsersService()
    type User = {
        _id?: ObjectId,
        username: string,
        email: string,
        password: string,
        avatar: string
    }
    let user: User = {
        _id: undefined,
        username: '',
        email: '',
        password: '',
        avatar: ''
    }

    it('Should be able to create a new user', async () => {
        const body = {
            username: 'Ganarok',
            email: 'ganarok@gmail.com',
            pasword: '123456',
            avatar: ''
        }

        user = await Service.createUser(body)        

        expect(user).to.have.property('_id')
    })

    it('Should be able to get a user by id', async () => {
        const result = await Service.getUserbyId(String(user._id))

        expect(result).to.have.property('_id')
    })

    it('Should be able to get a user by username', async () => {
        const result = await Service.getUser({ username: user.username })

        expect(result).to.have.property('_id')
    })

    it('Should be able to remove a user by id', async () => {
        const result = await Service.deleteUserById(String(user._id))

        expect(result).to.have.property('deletedCount')
    })
}