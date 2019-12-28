const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port =3000;

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//  hbs helpers
hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('streamit',(test)=>{
    return test.toUpperCase();
});
//  express middleware
app.use(express.static(__dirname +"/public"));

app.use((req,res,next)=>{
    res.render('maintenance');
});
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n',(error)=>{
        console.log('unable to connect');
    });
   next();
});
app.get('/',(req,res)=>{

     res.render('home.hbs',{
          pageTitle:'WELCOME',
          welcomeMessage:'welcome to my web site',

    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'ABOUT PAGE',
    });
});

app.get('/signup',(req,res)=>{
    res.send('bad');
});
app.listen(port,()=>{
    console.log(`server is up on port ${port} `);
});