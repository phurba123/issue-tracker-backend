const appConfig = require('../../appConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const issueController = require('../controller/issueController')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    //route for creating new issue
    //required
    //--body-->title,description,status,reporterId,reporterName,assigneeId and assigneeName(Optional),
    app.post(`${baseUrl}/create`, authMiddleware.isAuthorized, issueController.createIssue);
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issue/create api for creating new issue.
     *
     * @apiParam {string} title title of issue. (body params) (required)
     * @apiParam {string} description description of issue. (body params) (required)
     * @apiParam {string} status status of issue. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} reporterId userId of user creating issue. (body params) (required)
     * @apiParam {string} reporterName name of user creating issue. (body params) (required)
     * @apiParam {string} assigneeId userId of user to whom issue is assigned to. (body params) (optional)
     * @apiParam {string} assigneeName userId of user to whom issue is assigned to. (body params) (optional)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "New issue Created",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[],
                watchers:[],
                comments:[]
            }
                ]
        }
    */

    // getting all issue
    app.get(`${baseUrl}/view/all`, authMiddleware.isAuthorized, issueController.getAllIssues);
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/view/all api for getting all issues.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {number} skip number of data to skip for pagination. (query) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "All issues details found",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[],
                watchers:[],
            },
            {
                "issueId":"fdf88e38f",
                "title":"new issue title again",
                "description":"this is description again",
                "status":"in-test",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fdsjf8d",
                    "reporterName":"phurba"
                },
                assignee:[],
                watchers:[],
            }
                ]
        }
    */

    //getting single issue by issueid
    //params--issueId
    app.get(`${baseUrl}/:issueId/view`, authMiddleware.isAuthorized, issueController.getIssueById);
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/:issueId/view api for getting single issue detail
     *
     * @apiParam {string} issueId id of issue to view. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "issue detail found",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[],
                watchers:[],
                comments:[]
            }
                ]
        }
    */


    //getting issues assigned to a user
    //required--params--userId
    app.get(`${baseUrl}/:userId/view/all`, authMiddleware.isAuthorized, issueController.getIssuesOfUser);
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/:userId/view/all api for getting issues assigned to user
     *
     * @apiParam {string} userId id of user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {number} skip number of data to skip for pagination. (query) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "issue found for userId",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            },
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            }
                ]
        }
    */

    //getting reported issues of user
    //required --params--userId
    app.get(`${baseUrl}/:userId/reported/issues`, authMiddleware.isAuthorized, issueController.reportedIssuesOfUser);
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/:userId/reported/issues api for getting issues reported by user
     *
     * @apiParam {string} userId id of user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {number} skip number of data to skip for pagination. (query) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "reported issues of user",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            },
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            }
                ]
        }
    */

    //adding new comment
    app.post(`${baseUrl}/comment/create`, authMiddleware.isAuthorized, issueController.addComment)
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issue/comment/create api for adding comment
     *
     * @apiParam {string} userId id of user. (body params) (required)
     *  @apiParam {string} issueId issueId of issue to which comment is added to. (body params) (required)
     *  @apiParam {string} comment comment commented by user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "issue found for userId",
        "status": 200,
        "data": [
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            },
            {
                "issueId":"kjfds9fd9f3",
                "title":"new issue title",
                "description":"this is description",
                "status":"backlog",
                "createdOn":"2020-03-12T16:42:58.000Z",
                "reporter":
                {
                    "reporterId":"fjsd8f8f",
                    "reporterName":"mamba"
                },
                assignee:[]
            }
                ]
        }
    */

    //editing issue
    app.put(`${baseUrl}/:issueId/edit`, authMiddleware.isAuthorized, issueController.editIssue)
    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {put} /api/v1/issue/:issueId/edit api for editing issue
     *
     * @apiParam {string} issueId id of issue to view. (query params) (required)
     *  @apiParam {string} title new title of issue. (body params) (required)
     * @apiParam {string} description new description of issue. (body params) (required)
     * @apiParam {string} status new status of issue. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * 
     * @apiParam {string} assigneeId userId of user to whom issue is assigned to. (body params) (optional)
     * @apiParam {string} assigneeName userId of user to whom issue is assigned to. (body params) (optional)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "issue updated",
        "status": 200,
        "data": null
        }
    */

    //add watching
    //param--issueId,
    //body--watcherId,watcherName,authToken
    app.put(`${baseUrl}/:issueId/add/watcher`, authMiddleware.isAuthorized, issueController.addWatcher)
    /**
    * @apiGroup issue
    * @apiVersion  1.0.0
    * @api {put} /api/v1/issue/:issueId/add/watcher api for adding user as watcher
    *
    * @apiParam {string} issueId id of issue to view. (query params) (required)
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} watcherName userId of user watching issue. (body params) (optional)
    * @apiParam {string} watcherId userName of user watching issue. (body params) (optional)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
       "error": false,
       "message": "added as watcher",
       "status": 200,
       "data":
           {
               "watcherId":"fksjdf8",
               "watcherName":"roshan sharma"
           }
       }
   */

    app.get(`${baseUrl}/search/result`, authMiddleware.isAuthorized, issueController.searchIssue)
    /**
    * @apiGroup issue
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issue/search/result api for searching issue
    *
    * @apiParam {string} searchText search string input by user. (query params) (required)
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
       "error": false,
       "message": "search result",
       "status": 200,
       "data":[
           {
               "issueId":"kjfds9fd9f3",
               "title":"new issue title",
               "description":"this is description",
               "status":"backlog",
               "createdOn":"2020-03-12T16:42:58.000Z",
               "reporter":
               {
                   "reporterId":"fjsd8f8f",
                   "reporterName":"mamba"
               }
           },
           {
               "issueId":"kjfds9fd9f3",
               "title":"new issue title",
               "description":"this is description",
               "status":"backlog",
               "createdOn":"2020-03-12T16:42:58.000Z",
               "reporter":
               {
                   "reporterId":"fjsd8f8f",
                   "reporterName":"mamba"
               }
           }

       ]
           
       }
   */
}

module.exports = {
    setRouter: setRouter
}

