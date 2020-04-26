const mongoose = require('mongoose');
const validateInput = require('../lib/paramsValidationLib')
const response = require('../lib/responseLib')
const logger = require('../lib/loggerLib');
const checkLib = require('../lib/checkLib');
const shortid = require('shortid');
const passwordLib = require('../lib/passwordLib');
const timeLib = require('../lib/timeLib');
const tokenLib = require('../lib/tokenLib');
const emailLib = require('../lib/emailLib')

const UserModel = mongoose.model('userModel');
const authModel = mongoose.model('authModel')


let signUp = (req, res) => {
    let apiResponse;
    //validating email
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    apiResponse = response.generate(true, 'email does not met the requirement', 400, null);
                    logger.error('not valid email', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(req.body.password)) {
                    apiResponse = response.generate(true, 'password is empty', 400, null)
                    logger.error('password is empty', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else {
                    logger.info('user validated', 'userController:validateUserInput', 10);
                    resolve(req);
                }
            }
            else {
                logger.error('email field missing during user creation', 'userController:signUpFunction', 10);
                apiResponse = response.generate(true, 'one or more parameter is missing', 400, null);
                reject(apiResponse);
            }
        });
    }//end of validate user input

    //creating user after input validation
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(retrievedUserDetails)) {
                        //console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            mobileNumber: req.body.mobileNumber,
                            email: req.body.email.toLowerCase(),
                            password: passwordLib.hashPassword(req.body.password),
                            createdOn: timeLib.now()
                        })
                        newUser.save((err, newUserDetail) => {
                            if (err) {
                                //console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                //converting mongoose object to plain javascript object
                                let newUserObj = newUserDetail.toObject();
                                //console.log(newUserObj)

                                let emailOption =
                                {
                                    email: newUserObj.email,
                                    subject: "Sign-Up info",
                                    html: `Hi <i>${newUserObj.firstName}</i>,
                                    <p>You have successfully signed up with issue-tracker</p>`
                                }

                                emailLib.sendEmailToUser(emailOption);

                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            //console.log('inside resolve')
            delete resolve.password;
            delete resolve.__v;
            delete resolve._id;
            apiResponse = response.generate(false, 'user created', 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            //console.log('inside catch')
            res.send(error)
        })
}

let signIn = (req, res) => {
    //using promise for finding user
    let findUser = () => {
        //function for finding a user
        //console.log('find user');
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController:loginUser:findUser', 10);
                        apiResponse = response.generate(true, 'failed to find user detail', 500, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(userDetails)) {
                        //userdetails is empty so it means that the user with given email is not 
                        //registered yet
                        logger.info('no user found with given email', 'userController:findUser', 7);
                        apiResponse = response.generate(true, 'no user details found', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('user found', 'userController:findUser', 10);
                        resolve(userDetails);
                    }
                })
            }
            else {
                //if email is not present then execute this else
                logger.error('email is missing', 'userController:findUser', 10);
                apiResponse = response.generate(true, 'email is missing', 400, null);
                reject(apiResponse)
            }
        });//end of promise
    }//end of findUser

    let validatePassword = (retrievedUserDetails) => {
        //validating password provided
        //console.log('validate password');
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    logger.error(err.message, 'userController:validatePassword', 10);
                    apiResponse = response.generate(true, 'login failed', 500, null);
                    reject(apiResponse);
                }
                else if (isMatch) {
                    //converting mongoose object to normal javascript object 
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject();
                    delete retrievedUserDetailsObj.password;
                    delete retrievedUserDetailsObj._id;
                    delete retrievedUserDetailsObj.__v;
                    delete retrievedUserDetailsObj.createdOn;
                    resolve(retrievedUserDetailsObj);
                }
                else {
                    logger.info('login failed due to invalid password', 5);
                    apiResponse = response.generate(true, 'wrong password login failed', 400, null);
                    reject(apiResponse);
                }
            })
        })
    }//end of validating password

    let generateToken = (userDetails) => {
        //generating token on validation
        //console.log('generate token');
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (error, tokenDetails) => {
                if (error) {
                    logger.error(error);
                    apiResponse = response.generate(true, 'failed to generate token', 500, null);
                    reject(apiResponse);
                }
                else {
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            })
        })
    }//end of generating token

    let saveToken = (tokenDetails) => {
        //console.log('save token');

        return new Promise((resolve, reject) => {
            authModel.findOne({ 'userId': tokenDetails.userDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController:saveToken', 10);
                    apiResponse = response.generate(true, err.message, 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    //save new auth
                    let newauthModel = new authModel(
                        {
                            userId: tokenDetails.userDetails.userId,
                            authToken: tokenDetails.token,
                            tokenSecret: tokenDetails.tokenSecret,
                            tokenGenerationTime: timeLib.now()
                        }
                    );

                    newauthModel.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while saving new auth model', 'userController:savetoken', 10);
                            apiResponse = response.generate(true, err.message, 500, null);
                            reject(apiResponse)
                        }
                        else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(responseBody)
                        }
                    })
                }
                else {
                    //already present,so,update it
                    retrievedTokenDetails.authToken = tokenDetails.token;
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    retrievedTokenDetails.tokenGenerationTime = timeLib.now();

                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while updating token', 'userController:savetoken', 10);
                            apiResponse = response.generate(true, 'error while updating auth token', 500, null);
                            reject(apiResponse)
                        }
                        else {
                            //console.log('new token details after log in'+newTokenDetails.authToken)
                            //console.log('newtokendetails : ' + newTokenDetails)
                            let response = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(response)
                        }
                    })
                }
            })
        });//end of promise for saving token
    }//end of savetoken function

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            apiResponse = response.generate(false, 'login successfull', 200, resolve);
            logger.info(apiResponse.message, 'signIn');
            res.status(200);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(apiResponse);
        })
}

let signOut = (req, res) => {
    //to disable deprecated warning from mongo for mongoose findOneAndRemove
    mongoose.set('useFindAndModify', false);

    authModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            //console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null);
            logger.info('logged out')
            res.send(apiResponse)
        }
    })
}

/* Get all user Details */
let getAllUsers = (req, res) => {
    UserModel.find()
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                //console.log(err)
                logger.error('failed to find all user', 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

//function to resolve forgot password
let forgotPassword = (req, res) => {

    //validating email
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.email) {
                if (!validateInput.Email(req.params.email)) {
                    apiResponse = response.generate(true, 'email does not met the requirement', 400, null);
                    logger.error('not valid email', 'userController:recoverForgotPassword:validateUserInput', 10)
                    reject(apiResponse)
                }
                else {
                    logger.info('user validated', 'userController:validateUserInput', 10);
                    resolve(req);
                }
            }
            else {
                logger.error('email field missing', 'userController:recoverForgotPassword', 10);
                apiResponse = response.generate(true, 'Email is missing', 400, null);
                reject(apiResponse);
            }
        });
    }//end of validate user input

    let findUser = () => {
        return new Promise((resolve, reject) => {

            UserModel.findOne({ 'email': req.params.email })
                .select('-__v -_id')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        //console.log(err)
                        logger.error('failed to find user detail', 'User Controller: recoverPassword', 10)
                        apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(result)) {
                        logger.info('No User Found with given email', 'User Controller:recoverPassword')
                        apiResponse = response.generate(true, 'No User Found with given email', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result)

                    }
                })
        })
    }

    let generateAndSaveNewPassword = (userDetail) => {

        //generating new password
        let newPassword = passwordLib.generateNewPassword();
        //console.log('new password', newPassword);

        //updating userDetail with new hashed password
        userDetail.password = passwordLib.hashPassword(newPassword)

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'email': req.params.email }, userDetail).exec((err, result) => {
                if (err) {
                    //console.log(err)
                    logger.error('failed to reset password', 'User Controller:generateAndSavePassword', 10)
                    apiResponse = response.generate(true, 'Failed To reset Password', 500, null)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    logger.info('No email Found', 'User Controller: generateAndSaveNewPassword')
                    apiResponse = response.generate(true, 'No User with email Found', 404, null)
                    reject(apiResponse)
                } else {
                    //Creating object for sending email 
                    let sendEmailObj = {
                        email: req.params.email,
                        subject: 'Reset Password for Issue-tracker ',
                        html: `<h5> Hi ${userDetail.firstName}</h5>
                                <pre>
-----It seems you have forgot your password of Issue-tracker------
No worries , You have been provided a new password in replace to your
old password.
    
Your new password is -->${newPassword}<--
    
***** Keep visiting Issue-tracker****                                
</pre>`
                    }

                    setTimeout(() => {
                        emailLib.sendEmailToUser(sendEmailObj);
                    }, 1500);
                    apiResponse = response.generate(false, 'reset password successfull', 200, result)
                    resolve(apiResponse)
                }
            });
        })
    }//end of generating and saving new password

    validateUserInput(req, res)
        .then(findUser)
        .then(generateAndSaveNewPassword)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
    //logic of function
}//end of forgot password function

module.exports =
    {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        getAllUsers: getAllUsers,
        forgotPassword: forgotPassword
    }