import mongoose, { Schema } from "mongoose";

const activitySchema=new Schema({
    groupId:{
        type:Schema.Types.ObjectId,
        ref:'Group',
        required:true,
    },
    type:{
        type:String,
        enum:[
            'EXPENSE_ADDED',
            'PAYMENT_SENT',
            'PAYMENT_CONFIRMED',
            'PAYMENT_DECLINED'
        ],
        required:true,
    },
    performedBy:[
        {
            type: Schema.Types.ObjectId, // reference to User
            ref: "User",
            required: true,
        }
    ],

    performedFor:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],

    amount:{
        type:Number,
    },
    // title of expense ie Icecream , Restraunt
    title:{
        type:String,
        default:"",
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },

})

const Activity=mongoose.model("Activity", activitySchema);
export default Activity;