const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

const url = "mongodb+srv://foot:1234@cluster0.54bxc.mongodb.net/daimDB";

mongoose.connect(url, {useUnifiedTopology: true, useCreateIndex: false, useFindAndModify: true, useNewUrlParser: true});

const Schema = new mongoose.Schema({
    todo: String
})

const TodoModel = new mongoose.model('todolist', Schema);


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    TodoModel.find({}, function(err, docs){
        if(err) throw err;
        res.render('index', {"target": docs})
        
    })
  
})

app.post('/add', (req, res)=>{
    const newTodoModel = new TodoModel(req.body);
    newTodoModel.save();
    res.redirect('/');
})

app.listen(port, ()=>{
    console.log("Server is up and listening on " + port)
})
