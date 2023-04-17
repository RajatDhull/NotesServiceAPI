const mongoose=require("mongoose");

const NoteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{timestamp:true});

module.exports=mongoose.model("Note",NoteSchema);