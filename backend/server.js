const express = require('express');
const mongoose = require('mongoose');
const app=express();
const cors = require('cors');
const path = require('path');
const port = 3000 ;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
 
mongoose.connect("mongodb://127.0.0.1:27017/kaiburr")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:',err));


const usertask = new mongoose.Schema({
    name: String,
    id: String,
    assignee: String,
    project: String,
    startTime: Date,
    rajeshSinghProperty: {
      type: String,
      default: () => {
        return Math.random().toString(36).substring(2, 8);
      },
    },
  });
const usermodel= mongoose.model('model',usertask,'model');

app.get('/api/data',async(req,res)=>{
    try{
        const result= await usermodel.find({});
        if (result.length===0)
        {
            return res.status(404).json({error : "There is no data present!!"});
        }
        res.json(result);
    }
    catch(error){
        res.status(500).json({error:"Internal server error!!"});
    }
}); 

app.get('/api/data/:id',async(req,res)=>{
    try{
        const data = req.params.id;
        const result= await usermodel.findOne({id: data});
        if (!result)
        {
            return res.status(404).json({error : "The data is not found for the given id!!"});
        }
        res.json(result);
    }
    catch(error){
        res.status(500).json({error:"Internal server error!!"});
    }
});

app.get('/api/data/names/:name',async(req,res)=>{
  try { const data = req.params.name;
    const result = await usermodel.find({name : data});
    if(result.length===0)
    {
        return res.status(404).json({error :"There is no item with the given name!!"});
    }
    res.json(result);}

    catch(error)
    {
        res.status(500).json({error:"Internal server error !!"});
    }

})

app.get('/api/data/assign/:assignee',async(req,res)=>{
    try{
        const data= req.params.assignee;
        const result= await usermodel.find({assignee :data}).sort({startTime:1}).limit(10);
        if (result.length===0)
        {
            return res.status(404).json({error : "there is no task found for the given assignee!!"});
        }
        res.json(result);
    }
    catch(error)
    {
        res.status(500).json({error :"Internal server error!!"});
    }
})

app.post('/api/data' , async(req,res)=>{
    try
    {const data = req.body ;
    console.log(data);
    const check =  await usermodel.findOne({id :data.id});
    if (check)
    {
        return res.status(400).json({error :"There is already a task present with the same Id!!"})
    }
    const result = await usermodel.create(data);
    res.json(result);
}
    catch(error)
    {
        console.error(error);
        res.status(500).json({error:"Internal server error!!"});
    }

});

app.delete('/api/data/:id',async(req,res)=>{
    try{const data= req.params.id;
    const result= await usermodel.findOneAndDelete({id: data});
    if (!result)
    {
        return res.status(404).json({error:"The data is not found for the given Id!!"})
    }
    res.json(result);}
    catch(error){
        res.status(500).json({error:"Internal server error !!"})
    }

})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
  });

app.listen(port,() => {
    console.log(`console is running at http://localhost:${port}`);
});

