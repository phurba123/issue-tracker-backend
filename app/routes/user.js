const appConfig = require('../../appConfig');
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/user`;


    app.post(`${baseUrl}/signup`, userController.signUp);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/signup api for Registering User.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {number} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "User Created",
        "status": 200,
        "data": 
            {
                "createdOn": "2020-03-12T16:42:58.000Z",
                "email": "gomail@gmail.com",
                "mobileNumber": "91 7384756357",
                "firstName": "phurba",
                "lastName": "sherpa",
                "userId": "B1cyuc8OX"
            }
        }
    */


    app.post(`${baseUrl}/signin`, userController.signIn);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/signin api for login.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "login successfull",
        "status": 200,
        "data": {
                "authToken": "32kjciOiJIsdkfjkjfkej9eu93u32oir6MTUzODgxNzIzNDUzNCwiZXhwIjskdfj89ds89f",
                "userDetails": {
                    "email": "gomail@gmail.com",
                    "mobileNumber": "91 7840962887",
                    "lastName": "sharma",
                    "firstName": "roshan",
                    "userId": "389ejh7",
                    "createdOn":"2020-03-12T16:42:58.000Z"
            }
        }
        }
    */
    app.post(`${baseUrl}/signout`, authMiddleware.isAuthorized, userController.signOut);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/signout api to logout .
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)

     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */
    app.get(`${baseUrl}/view/all`, authMiddleware.isAuthorized, userController.getAllUsers);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/v1/user/view/all api for Getting all users.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Users Found",
            "status": 200,
            "data": [
                {
                    "createdOn": "2020-09-16T13:33:58.000Z",
                    "email": "nomail@gmail.com",
                    "mobileNumber": "91 7840962887",
                    "lastName": "sharma",
                    "firstName": "govind",
                    "userId": "dfjsh8sdfyf"
                },
                {
                    "createdOn": "2020-09-16T13:33:58.000Z",
                    "email": "yesmail@gmail.com",
                    "mobileNumber": "91 7840949585",
                    "countryName": "India",
                    "lastName": "sharma",
                    "firstName": "rahul",
                    "userId": "dfjsfd87"
                }
            ]
        }
    */
    app.post(`${baseUrl}/:email/forgotpassword`, userController.forgotPassword);
    /**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/v1/user/:email/forgotpassword api for password reset.
     * @apiParam {string} email email of the user. (query params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "reset password successfull",
        "status": 200,
        "data": 
        }
        }
    */
}

module.exports =
    {
        setRouter: setRouter
    }