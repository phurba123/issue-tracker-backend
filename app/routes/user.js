const appConfig = require('../../appConfig');
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/user`
    app.post(`${baseUrl}/signup`, userController.signUp)
    app.post(`${baseUrl}/signin`, userController.signIn);
    app.post(`${baseUrl}/signout`,authMiddleware.isAuthorized, userController.signOut)
}

module.exports =
    {
        setRouter: setRouter
    }