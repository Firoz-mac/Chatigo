const mongoose=require('mongoose');

const conversationSchema= new mongoose.Schema(
    {
        participants:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
        ],
        lastMessage:{
            type:String,
            default:'',
        },
        unreadCounts:{
            type: Map,
            of: Number,
            default: {},
        },
    },
    {timestamps:true}
);

const conversationModel=mongoose.model('conversation',conversationSchema);
module.exports=conversationModel;