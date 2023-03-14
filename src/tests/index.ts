import server from '@/index'
import users from './users'

describe('Express Typescript tests', () => {
    describe('Users test', users.bind(this))
})

after(done => {
    server.close(done)
})