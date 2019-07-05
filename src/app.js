const path=require('path');
const express=require('express');
const hbs=require('hbs');
const permute=require('./utils/permute.js');

const app=express();

//Getting port from Heroku 
const port = process.env.PORT || 3000;

//Define paths for express config
const viewsPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view/partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=>{
    res.status(201).render('index');
})

app.get('/word', (req, res)=>{
    const perm=permute.permute(req.query.word);
    //console.log(num);
    //res.status(201).send(num);
    res.status(201).render('permute', {
        permutations: perm
    })
})

app.listen(port, ()=>{
    console.log('Server listening on port '+port);
});