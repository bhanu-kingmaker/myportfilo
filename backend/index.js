const express =require('express');
const bodyparser =require('body-parser');
const cookiesparser=require('cookie-parser');
const cors=require('cors');

const app=express();
app.use(bodyparser.json())
app.use(cookiesparser());
app.use(cors({credentials:true}));

const port = 5000;

const {MongoClient}= require('mongodb');

const url =  'mongodb+srv://yerakalabhanupranay2004:Aditya123@cluster0.qw1ss4h.mongodb.net/'
const dbname = 'myportfilo';
const connection = new MongoClient(url);
var signup;
var clients;

connection.connect().then(()=>
{
    const database =connection.db(dbname);
    signup = database.collection('contactdata');
    console.log('database has been connected');
}).catch(()=>
{
    console.log('database has not connected');
});

app.post('/contact', (req,res)=>{
    var {name,email,gender,interests,message} = req.body;
    const data ={name,email,gender,interests,message};

    signup.findOne({email:email}).then((results)=>{
        if(results){
        res.status(300).send('you have already sended you details to me')
        }
        else{
            signup.insertOne(data).then(()=>{
                res.status(200).send('user added successfully');
            }).catch((err)=>{
                console.log(err);
                console.log('Error ocuured in software')
                res.status(250).send('db error');
            })
        }
    }).catch((err)=>{
        console.log(err);
        console.log('error occured in signup api findone ')
        res.status(500).send('db error');
    })
})

app.listen(port,()=>
{
  console.log("server is running at: "+port);
})