const mongoose=require('mongoose');

const conversationSchema= new mongoose.Schema(
    {
        participants:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Users'
            },
        ],
        lastMessage:{
            type:String,
            default:'',
        },
    },
    {timestamps:true}
);

const conversationModel=mongoose.model('conversation',conversationSchema);
module.exports=conversationModel;