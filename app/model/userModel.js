const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId:{
        type:String,
        index:true,
        default:'',
        unique:true
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    mobileNumber:{
        type:Number,
        default:''
    },
    createdOn:{
        type:Date,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    }
})

mongoose.model('userModel',userSchema)