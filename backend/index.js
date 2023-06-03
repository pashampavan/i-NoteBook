const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const JWT_SECRET="pavan is a good boy";
const bcrypt=require('bcryptjs')
const cors=require('cors');
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const port=74;
const path=require('path');
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));
const mongoose = require('mongoose');
const { URL } = require('url');
const db='mongodb+srv://pashampavan:Pavan02@cluster0.bizzz4b.mongodb.net/react?retryWrites=true&w=majority';
mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex :true,
    useUnifiedTopology:true,
    useFindAndModify:false
    }).then(()=>{
        console.log("connected")
    }).catch((err)=>{
        console.log("erroe occured")
            });
const {body , validationResult}=require('express-validator');
const NotesSchema=new mongoose.Schema({
        // title:String ,
        // description:String ,
        // tag:String ,
        // date:String
        title:{type:String ,required:true},
        discription:{type:String },
        user:{type:String,require:true},
        tag:{type:String ,required:true},
        date:{ type:Date,default:Date.now()}
    
})
var Notes=mongoose.model('notes',NotesSchema);

const UsersSchema=new mongoose.Schema({
    // name:String,
    // email:String,
    // password:String,
    // date:String
    name:{ type:String, required:true},
    email:{ type:String, required:true,unique:true  },
    password:{ type:String, required:true},
    date:{ type:Date,default:Date.now()}
    
})
var User=mongoose.model('users',UsersSchema);

///////////////////////////////////////////////////////////////////////////////////////USER
app.post('/api/auth/createUser',[
    body('name','enter a valid name:').isLength({min:3}),
    body('email','enter valid email:').isEmail(),
    body('password',' enter valid password:').isLength({min:5})
   ]
    ,async (req,res)=>{
    // console.log(req.body);
    let user=new User(req.body);
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {

        return res.status(400).json({success:success,errors:errors.array()})
    }
    try
    {

        let u=await User.findOne({"email":req.body.email})
        if(u)
        {
            return res.status(400).json({"success":success ,"error":"uesr already exist with same email."})
        }
        // user.save(function(err,user){
        //     if(err) return console.log(err)
        //     console.log(user);
        // })
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const jwtData=jwt.sign(data,JWT_SECRET);
        console.log(jwtData);
        success=true;
        res.json({"success":success,"user":req.body});
    }catch(err)
    {
        success=false;
        console.log("errors occured intrnally");
        return res.status(400).json({"error":"error internally."})
    }
})
app.post('/api/auth/login',[
    body('email','enter valid email:').isEmail(),
    body('password',' enter valid password:').exists()
   ]
    ,async (req,res)=>{
    // console.log(req.body);
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        success=false;
        return res.status(400).json({"success":success,errors:errors.array()})
    }
    try
    {

        let user=await User.findOne({"email":req.body.email})
        if(!user)
        {
            success=false;
            return res.status(400).json({"success":success,"error":"Please  user enter correct credentials.."})
        }
        const passwordCompare=await bcrypt.compare(req.body.password,user.password);
        if(!passwordCompare)
        {
            success=false;
            return res.status(400).json({"success":success,"error":"Please password enter correct credentials.."})    
        }
        const data={
            user:{
                id:user.id
            }
        }
        success=true;
        const authtoken=jwt.sign(data,JWT_SECRET);
        // console.log(authtoken);
        res.json({"success":success,"authtoken":authtoken});
    }catch(err)
    {
        success=false;
        return res.status(400).json({"success":success,"error":"error internally."})
    }
})
const fetchUser=(req,res,next)=>{

    const token=req.header('auth-token');
    if(!token)
    {
        return res.status(400).json({"error":"Please authenticate using fetchvalid token."})
    }
    try
    {

        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(err)
    {
        return res.status(400).json({"error":"Please authenticate using fetchvalid token."})
    }

}
app.post('/api/auth/getUser',fetchUser
    ,async (req,res)=>{
     try{
        const  userId=req.user.id;
        const user=await User.findById(userId);
        res.status(400).json({user})
    }catch(err)
    {
        return res.status(400).json({"error":"error internally in get user."})
    }

})
///////////////*****End



//////////////////////////////////////////////////////////////////////////////////////notes

app.get('/api/notes/getallnotes',fetchUser,async (req,res)=>{
    try{

        const notes=await Notes.find({"user":req.user.id});
        if(!notes.isEmpty)
        {
            return res.json(notes);
        }
        res.status(400).json({"notes":"notes is not there"});
    }catch(err)
    {
        return res.status(400).json({"error":"error internally in saving  user notes."})
    }
    })
    
    app.post('/api/notes/addnote',fetchUser,[
        body('title','enter a valid title min3:').isLength({min:3}),
        body('tag','enter a valid title min3:').isLength({min:4}),
        body('discription',' enter valid valid discription min-5:').isLength({min:5})
       ],async (req,res)=>{
        try{
    
            const errors=validationResult(req);
            if(!errors.isEmpty())
            {
                return res.status(400).json({errors:errors.array()})
            }
            const note=new Notes({"title":req.body.title,"discription":req.body.discription,"user":req.user.id,"tag":req.body.tag});
            const notes=await note.save();
            return res.status(400).json({notes});
        }catch(err)
        {
            return res.status(400).json({"error":"error internally in saving  user notes."})
        }
        })
    
app.put('/api/notes/updatenote/:id',fetchUser,async (req,res)=>{
    try{
        
        const note={};
        const {title,discription,tag}=req.body;
        if(title){ note.title=title;}
        if(discription){ note.discription=discription;}
        if(tag){ note.tag=tag;}
        const notes=await Notes.findById(req.params.id);
        if(!notes)
        {
            return res.status(404).json({"error":"notes not found."})
        }
        if(req.user.id !==notes.user)
        {
            return res.status(400).json({"error":"not allowed."});
        }
        const update=await Notes.findByIdAndUpdate(req.params.id, {$set:note},{new:true});
        return res.status(400).json(update);

    }catch(err)
    {
        console.log(err);
        return res.status(400).json({"error":"error internally in updating user notes."})
    }
    })
    
app.get('/api/notes/deletenote/:id',fetchUser,async (req,res)=>{
    try{
        
        const notes=await Notes.findById(req.params.id);
        if(!notes)
        {
            return res.status(404).json({"error":"notes not found."})
        }
        if(req.user.id !==notes.user)
        {
            return res.status(400).json({"error":"not allowed."});
        }
        const d=await Notes.findByIdAndDelete(req.params.id);
        return res.status(400).json({"success":"notes has deleted","notes":d});

    }catch(err)
    {
        console.log(err);
        return res.status(400).json({"error":"error internally in updating user notes."})
    }
    })
        ///////////////*End
app.listen(5000,()=>{
    console.log("Listening on port 5000");
})