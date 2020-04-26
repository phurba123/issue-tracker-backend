const socketio = require('socket.io');
const tokenLib = require('../lib/tokenLib')

let setServer = (server) => {
    let io = socketio.listen(server);
    let myIo = io.of('/');

    //console.log('inside setserver on socket')

    myIo.on("connection", (socket) => {
        //console.log('inside connection')
        //listening to verify-user event for verifying authtoken
        socket.on("verify-user", (data) => {
            tokenLib.verifyClaimWithoutSecret(data.authToken, (err, result) => {
                if (err) {
                    //emit auth-error event when token is invalid or not provided
                    socket.emit(`auth-error-${data.userId}`, 'token invalid');
                }
                else
                {
                    socket.emit(`auth-error-${data.userId}`,'token valid');
                }
            })
        })

        //listening to updates ,data should include info about issueId,assignee,reporter,watchers,userId,message
        
        socket.on('notify-updates', (data) => {
            //console.log('socket : ',data)

            let usersId = [];//empty array to hold ids of all users including

            //if userId of commenting user is not the one who has reported the issue then only include it in usersId
            if (data.userId != data.reporter.reporterId) {
                //console.log('not equal')
                usersId.push(data.reporter.reporterId)
            }

            //loop through the assignees to include in usersId array,excluding one who is commenting if he is in assignee
            //list
            let assignees = data.assignee;
            if (assignees.length > 0) {
                //console.log('assignee is greater than 0')
                assignees.forEach((assignee) => {
                    if (assignee.assigneeId != data.userId) {
                        usersId.push(assignee.assigneeId)
                    }
                })
            }


            let watchers = data.watchers;
            if (watchers.length > 0) {
                watchers.forEach((watcher) => {
                    if (watcher.watcherId != data.userId) {
                        usersId.push(watcher.watcherId)
                    }
                })
            }


            let newData =
            {
                issueId: data.issueId,
                message: data.message
            }
            //console.log('usersId : ',usersId)


            //loop throught usersId and emit to each ids
            usersId.forEach((userId) => {
                //console.log('inside foreach',userId)
                socket.broadcast.emit(userId,(newData))
            })


        })//end of notify-added-comment

    })//end of connection event
}

module.exports = {
    setServer: setServer
}