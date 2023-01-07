const express=require('express');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
//const route=express.Router();

 
const app=express();
app.use(express.static(__dirname+ '/views'));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("mail");
    //res.sendFile(__dirname + 'mail.ejs');
});

app.get("/sent",(req,res)=>{
    res.render("sent");
    //res.sendFile(__dirname + 'sent.ejs');
})



//app.use('/v1', route);

let transport= nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user:'mkbastronaut441@gmail.com',
        pass:'inudcsxglkiaepun'
    }
});

app.post('/index.js', (req,res)=>{
    const {to, subject, text}=req.body;
    const mailOptions={
        from:'mkbastronaut441@gmail.com',
        to:'manishbhagwane2408@gmail.com',
        subject:'Nodemailer testing',
        text: text,
        
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',

    }
    transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Email sent ' + info.messageId + info.response);
        }
    });
    return res.redirect('sent.html');
});



app.listen(3000,()=>{
    console.log(`server is listening at http://localhost:3000`);
});