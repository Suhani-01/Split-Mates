import mongoose, { Schema } from "mongoose";

const activitySchema=new Schema({

    // -- Group to which activity Belong to --
    groupId:{
        type:Schema.Types.ObjectId,
        ref:'Group',
        required:true,
    },

    // -- Activity Type --
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
    
    // -- Who Performed the Activity --
    performedBy:[
        {
            type: Schema.Types.ObjectId, // reference to User
            ref: "User",
            required: true,
        }
    ],

    // -- For whom the Activity is Performed --
    performedFor:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],

    // -- Amount Involved in Activity --
    amount:{
        type:Number,
    },
    
    // -- Title in case of new Expense --
    title:{
        type:String,
        default:"",
    },

    // -- Timing of Activity --
    timestamp:{
        type:Date,
        default:Date.now,
    },

})

const Activity=mongoose.model("Activity", activitySchema);
export default Activity;