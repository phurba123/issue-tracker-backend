const appConfig = require('../../appConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const issueController = require('../controller/issueController')

let setRouter = (app)=>
{
    let baseUrl=`${appConfig.apiVersion}/issue`;

    //route for creating new issue
    //required
    //--body-->title,description,status,reporterId,reporterName,assigneeId and assigneeName(Optional),
    app.post(`${baseUrl}/create`,authMiddleware.isAuthorized,issueController.createIssue);

    // getting all issue
    app.get(`${baseUrl}/view/all`,authMiddleware.isAuthorized,issueController.getAllIssues);

    //getting single issue by issueid
    //params--issueId
    app.get(`${baseUrl}/:issueId/view`,authMiddleware.isAuthorized,issueController.getIssueById);

    //getting issues assigned to a user
    //required--params--userId
    app.get(`${baseUrl}/:userId/view/all`,authMiddleware.isAuthorized,issueController.getIssuesOfUser);

    //getting reported issues of user
    //required --params--userId
    app.get(`${baseUrl}/:userId/reported/issues`,authMiddleware.isAuthorized,issueController.reportedIssuesOfUser);

    //adding new comment
    app.post(`${baseUrl}/comment/create`,authMiddleware.isAuthorized, issueController.addComment)
}

module.exports={
    setRouter:setRouter
}

