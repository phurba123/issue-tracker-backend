const logger = require('../lib/loggerLib');
const response = require('../lib/responseLib')
const mongoose = require('mongoose')
const issueModel = mongoose.model('IssueModel');
const shortId = require('shortid');
const timeLib = require('../lib/timeLib')

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
    .then((resolve)=>
    {
        res.send(resolve)
    })
    .catch((error)=>
    {
        res.send(error)
    })
};

module.exports = {
    createIssue: createIssue
}