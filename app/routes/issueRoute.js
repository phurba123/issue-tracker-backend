const appConfig = require('../../appConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const issueController = require('../controller/issueController')

let setRouter = (app)=>
{
    let baseUrl=`${appConfig.apiVersion}/issue`;

    //route for creating new issue
    //required
    //--body-->title,description,status,reporterId,reporterName,assigneeId and assigneeName(Optional),
    app.post(`${baseUrl}/create`,authMiddleware.isAuthorized,issueController.createIssue)
}

module.exports={
    setRouter:setRouter
}

