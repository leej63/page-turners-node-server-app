import * as dao from './users-general-dao.js';

const GeneralUserController = (app) => {
    const createUser = async (req, res) => {
        const user = req.body
        const actualUser = await dao.createUser(user)
        res.json(actualUser)
    }

    const findAllUsers = async (req, res) => {
        const allUsers = await dao.findAllUsers()
        res.send(allUsers);
    }

    const deleteUser = async (req, res) => {
        const uid = req.params.uid
        const status = await dao.deleteUser(uid)
        res.json(status)
    }

    const updateUser = async (req, res) => {
        const updates = req.body
        const status = await dao.updateUser(updates)
        res.json(status)
    }

    const register = async (req, res) => {
        const user = req.body
        const existingUser = await dao.findByUsername(user.username)
        if (existingUser) {
            res.sendStatus(403)
            return
        }
        const currentUser = await dao.createUser(user)
        req.session['currentUser'] = currentUser
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await dao.findByCredentials(credentials.username, credentials.password)
        if (!existingUser) {

            res.sendStatus(403)
            return
        }
        req.session['currentUser'] = existingUser
        res.json(existingUser)

    }

    const profile = async (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const welcomeRecentNewUsers = async (req,res)=>{
        const welcomeRecentNewUsers = await dao.welcomeRecentNewUsers()
        res.send(welcomeRecentNewUsers);
    }

    app.post('/general-users', createUser)
    app.get('/general-users', findAllUsers)
    app.delete('/general-users/:uid', deleteUser)
    app.put('/general-user', updateUser)
    app.get('/welcome-recent-new-users',welcomeRecentNewUsers)
    app.post('/general-register', register)

    //apply to both admin and general users
    app.post('/login', login)
    app.post('/profile', profile)
    app.post('/logout', logout)
}

export default GeneralUserController