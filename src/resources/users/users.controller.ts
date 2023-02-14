import { Router } from "express"
import { UsersService } from "@/resources/users/users.service"

const UsersController = Router()

const Service = new UsersService()

UsersController.get('/', (req, res) => {
    // GET All users
})

UsersController.post('/', (req, res) => {
    // POST Create users
})

UsersController.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    // PATCH Update Users by :id
})

UsersController.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    // DELETE Remove Users by :id
})

UsersController.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    // GET Users by :id
})

export { UsersController }
