const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeLib =  require('../lib/timeLib')

let issueSchema = new Schema(
    {
        issueId:{
            type:String,
            unique:true,
            index:true
        },
        title:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        status:{
            type:String,
            default:'backlog'
        },
        createdOn:{
            type:Date,
            default:timeLib.now()
        },
        reporter:{
            reporterId:{
                type:String
            },
            reporterName:{
                type:String
            }
        },
        assignee:[{
            assigneeId:{
                type:String
            },
            assigneeName:{
                type:String
            }
        }],
        watchers:[{
            watcherId:{
                type:String
            },
            watcherName:{
                type:String
            }
        }],
        comments:[{
            commenterId:{
                type:String
            },
            commenterName:{
                type:String
            },
            comment:{
                type:String,
                default:''
            }
        }]
    }
)

mongoose.model('IssueModel',issueSchema);