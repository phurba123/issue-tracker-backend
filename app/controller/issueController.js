const logger = require('../lib/loggerLib');
const response = require('../lib/responseLib')
const mongoose = require('mongoose')
const issueModel = mongoose.model('IssueModel');
const shortId = require('shortid');
const timeLib = require('../lib/timeLib');
const checkLib = require('../lib/checkLib')

let apiResponse = "";

//create new issue
let createIssue = (req, res) => {
    //title,description,status,reporterId,reporterName
    let validateInputs = () => {
        return new Promise((resolve, reject) => {
            if (req.body.title, req.body.description, req.body.status, req.body.reporterId, req.body.reporterName) {
                resolve(req)
            }
            else {
                logger.error('one or more parameter is missing', 'issuecontroller:createIssue', 10);
                apiResponse = response.generate(true, 'one or more parameter is missin', 500, null)
                reject(apiResponse)
            }
        })
    }//end of validateInputs

    let createNewIssue = () => {
        return new Promise((resolve, reject) => {

            let data =
            {
                issueId: shortId.generate(),
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                createdOn: timeLib.now(),
                reporter:
                {
                    reporterId: req.body.reporterId,
                    reporterName: req.body.reporterName
                },
                assignee: []
            }

            //if assigneeId and assigneeName is provided than include it ,else dont
            if (req.body.assigneeId && req.body.assigneeName) {
                data.assignee.push({ assigneeId: req.body.assigneeId, assigneeName: req.body.assigneeName });
            }

            let newIssue = new issueModel(data);

            //saving on db
            newIssue.save((err, result) => {
                if (err) {
                    logger.error(err, 'issueController:createNewIssue', 10);
                    apiResponse = response.generate(true, 'error while creating new issue', 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info('new Issue created', 'issueController:createIssue', 5);

                    let resultObject = result.toObject();

                    delete resultObject._id;
                    delete resultObject.__v;

                    //for deleting _id that is created on assignee
                    // if(resultObject.assignee)
                    // {
                    //     delete resultObject.assignee._id
                    // }

                    apiResponse = response.generate(false, 'New issue created', 200, resultObject);
                    resolve(apiResponse)
                }
            })
        })

    }//end of createNewIssue promise

    validateInputs(req, res)
        .then(createNewIssue)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
};

//getting all issues
let getAllIssues = (req, res) => {
    issueModel.find()
        .select(' -__v -_id -comments')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error('failed to find all issues', 'issue Controller: getAllIssues', 10)
                let apiResponse = response.generate(true, 'Failed To Find all issues', 500, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                logger.info('No issues Found', 'issue Controller: getAllIssues')
                let apiResponse = response.generate(true, 'No issues Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All issues Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}//end of getting all issues

/* Get single issue details */
let getIssueById = (req, res) => {
    issueModel.findOne({ 'issueId': req.params.issueId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error('failed to find single issue detail', 'issue Controller: getIssueById', 10)
                let apiResponse = response.generate(true, 'Failed To Find issue Detail', 500, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                logger.info('No issue Found', 'issue Controller:getIssueById')
                let apiResponse = response.generate(true, 'No issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let getIssuesOfUser = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                logger.error('No userId provided');
                apiResponse = response.generate(true, 'userId not provided', 500, null);
                reject(apiResponse)
            }
        })
    }//end of validate input promise

    //finding all issues of user from issue model

    let getIssues = () => {
        return new Promise((resolve, reject) => {
            issueModel.find({ "assignee.assigneeId": req.params.userId })
                .select('-id -__v -comments -watchers')
                .exec((err, result) => {
                    if (err) {
                        logger.error(err, 'IssueController:getIssues', 10);
                        apiResponse = response.generate(true, 'failed to get issues', 500, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.info('no any issues found with given userId');
                        apiResponse = response.generate(true, 'no any issues found for given userId');
                        reject(apiResponse)
                    }
                    else {
                        logger.info('issues found for userId provided');
                        apiResponse = response.generate(false, 'issues found for userId', 200, result);
                        resolve(apiResponse)
                    }
                })
        })
    }

    validateInput(req, res)
        .then(getIssues)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
}

let reportedIssuesOfUser = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req)
            }
            else {
                logger.error('UserId not provided');
                apiResponse = response.generate(true, 'UserId not provided', 500, null);
                reject(apiResponse)
            }
        })
    }

    //getting reported issues from db
    let getReportedIssues = () => {
        return new Promise((resolve, reject) => {
            issueModel.find({ "reporter.reporterId": req.params.userId })
                .select('-id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error(err, 'IssueController:getReportedIssues', 10);
                        apiResponse = response.generate(true, 'error while getting reported issues from server', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.info('no reported issues found')
                        apiResponse = response.generate(true, 'no reported issues found', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        logger.info('reported issues found for user');
                        apiResponse = response.generate(false, 'reported issues found', 200, result);
                        resolve(apiResponse);
                    }
                })
        })
    }//end of getReportedIssues promise

    validateInput(req, res)
        .then(getReportedIssues)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
}

//adding comment to issue
let addComment = (req, res) => {
    let validateInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId, req.body.firstName, req.body.comment, req.body.issueId) {
                resolve(req)
            }
            else {
                logger.error('one or more parameter missing', 'Issuecontroller:addComment');
                apiResponse = response.generate(true, 'one or more parameter is missing', 500, null);
                reject(apiResponse)
            }
        })
    }//end of validateinput

    let confirmIssueId = () => {
        return new Promise((resolve, reject) => {
            issueModel.findOne({ 'issueId': req.body.issueId })
                .exec((err, result) => {
                    if (err) {
                        logger.error('error while finding issue', 'issuecontroller:addcomment', 10);
                        apiResponse = response.generate(true, 'error while finding issue to add comment', 500, null);
                        reject(apiResponse)
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('no issue found for adding comment');
                        apiResponse = response.generate(true, 'no issue found for adding comment', 404, null);
                        reject(apiResponse)
                    }
                    else {
                        resolve(req)
                    }
                })
        })

    }

    let addingComment = () => {
        return new Promise((resolve, reject) => {
            //comment object
            let comment =
            {
                commenterId: req.body.userId,
                commenterName: req.body.firstName,
                comment: req.body.comment
            }

            //using array method to push comment onto issue
            let option = {
                $push: {
                    comments: {
                        $each: [comment]
                    }
                }
            }

            issueModel.updateOne({ 'issueId': req.body.issueId }, option).exec((err, result) => {
                if (err) {
                    logger.error(err, 'issuecontroller:addingcomment', 10);
                    apiResponse = response.generate(true, 'error while adding comment from server', 500, null);
                    reject(apiResponse)
                }
                else {
                    logger.info('comment added');
                    apiResponse = response.generate(false, 'comment added', 200, comment);
                    resolve(apiResponse)
                }
            })
        })
    }//end of adding comment

    validateInput(req, res)
        .then(confirmIssueId)
        .then(addingComment)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((error) => {
            res.send(error)
        })
}

module.exports = {
    createIssue: createIssue,
    getAllIssues: getAllIssues,
    getIssueById: getIssueById,
    getIssuesOfUser: getIssuesOfUser,
    reportedIssuesOfUser: reportedIssuesOfUser,
    addComment: addComment
}