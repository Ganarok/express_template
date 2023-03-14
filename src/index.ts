
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import { appConfig } from '@/config'
import { UsersController } from '@/resources/users/users.controller'
import { ExceptionsHandler } from '@/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '@/middlewares/unknownRoutes.handler'

/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

/**
 * Toutes les routes CRUD pour les Users seronts préfixées par "/users"
 */
app.use('/users', UsersController)

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get('/', (req, res) => res.send('🏠'))

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
const httpServer = app.listen(appConfig.API_PORT, () => {
    console.log( __dirname, process.env.ENV)
    console.log(`Server running on port ${appConfig.API_PORT}`)
})

export default httpServer