const express=require("express");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const app=express()
const bodyParser = require("body-parser");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port=process.env.port||4000;
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("NotesAPI from Rajat Dhull")
});

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{ 
        app.listen(port,()=>{
            console.log("Server started at port "+port);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
app.use("/users",userRouter)
app.use("/note",noteRouter)
