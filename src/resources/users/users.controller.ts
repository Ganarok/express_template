import { Router } from "express"
import bcrypt from "bcrypt"

import { UsersService } from "@/resources/users/users.service"

const UsersController = Router()
const Service = new UsersService()

UsersController.get('/', async (req, res) => {
    try {
        const result = await Service.getUsers({ ...req.query })

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        
        res.status(500).send({ message: error })
    }
})

UsersController.post('/', async (req, res) => {
    try {
        const { body } = req

        if (!body)
            res.status(400).send({ message: 'Missing body' }).end()

        body.password = await bcrypt.hash(body.password, 10)

        const result = await Service.createUser(req.body)

        res.status(200).json(result)
    } catch (error) {
        console.log(error);

        res.status(500).send(error)
    }
})

UsersController.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!req.body)
            res.status(400).send({ message: 'Missing body' }).end()
        
        if (!id)
            res.status(400).send({ message: 'Missing id' }).end()

        const result = await Service.updateUserById(id, req.body)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        
        res.status(500).send({ message: error })
    }
})

UsersController.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!id)
            res.status(400).send({ message: 'Missing id' }).end()

        await Service.deleteUserById(id)

        res.status(200).send({ message: 'User deleted' })
    } catch (error) {
        console.log(error);
        
        res.status(500).send({ message: error })
    }
})

UsersController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!id)
            res.status(400).send({ message: 'Missing id' }).end()

        const result = await Service.getUserbyId(id)

        if (!result)
            res.status(404).send({ message: 'User not found' }).end()

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        
        res.status(500).send({ message: error })
    }
})

export { UsersController }
