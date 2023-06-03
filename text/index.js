// const mongoConnect=require('./db');
const mongoose=require('mongoose');
const db="mongodb+srv://pashampavan:Pavan02@cluster0.bizzz4b.mongodb.net/mini?retryWrites=true&w=majority';";
const mongoConnect=()=>{
    mongoose.connect(db,{
        useNewUrlParser: true,
        useCreateIndex :true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }).then(()=>{
        console.log("connected")
    }).catch((err)=>{
        console.log("error occured")
    });
    }
mongoConnect();
