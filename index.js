const bodyParser = require('body-parser');
const express = require('express');
const { use } = require('express/lib/application');
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
 


const comments =require('./models/comments')
const posts=require('./models/posts')
const users=require('./models/users')
const photos=require('./models/photos')
const todo=require('./models/todo');
const { retry } = require('async');
const { render } = require('ejs');
app.get('/home',async(req,res)=>{
    res.render('menu.ejs',{users})
})


app.get('/home/:id',async(req,res)=>{
    const {id}=req.params;
    const user=users.find(c=>JSON.stringify(c.id)===id);
    const photo=photos.filter(checkId);
    function checkId(photo){
        return  JSON.stringify(photo.albumId)===id;
    }
    
     
      

    res.render('details.ejs',{ user,photo })
})
app.get('/comments/:id',async(req,res)=>{
    const {id}=req.params;
    const user=users.find(c=>JSON.stringify(c.id)===id);
    
    const photo=photos.filter(checkId);
    function checkId(photo){
        return  JSON.stringify(photo.albumId)===id;
    }
    
    const comment=comments.filter(checkAid);
    function checkAid(comment){
        return JSON.stringify(comment.postId)===id
    }
    
    res.render('comments.ejs',{comment,user,photo})
})

app.listen(3000,()=>{ 
    console.log("listen on the server 3000!!!");
})
    