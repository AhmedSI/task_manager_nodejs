
const Task = require('../models/task.model.js');

tasks = []

tasks.push(new Task(0,"Check emails","Open your email and check if any customer needs help.",false))
tasks.push(new Task(1,"Check the notifications","Search your applications for any new notifications.",false))
tasks.push(new Task(2,"Call cleint","Call the last client to make sure he is good.",true))
tasks.push(new Task(3,"Do sports","Go to the sports hall and do some exersices.",false))
tasks.push(new Task(4,"Eat lunch","Go to the the restaurant and eat lunch meal.",true))

exports.create = (req, res) => {
    // Validate request
    if(!req.body.title||!req.body.description) {
        return res.status(400).send({
            message: "Task tile and description can not be empty"
        });
    }
    
    // Save task in the database
    var promise = new Promise(function(resolve, reject) {
        // simple way to generate key
        var id =0
        var tasksLength = tasks.length
        if(tasksLength>0)
            id = tasks[tasksLength-1].taskId+1

        // Create task entity
        const task = new Task(id,req.body.title || "Untitled Task", req.body.description,false)
        
        // save the task
        tasks.push(task); 

        // resolve task to response
        resolve(task); 
    }); 
        
    promise
    .then(task=>{
        res.send({"message":"Added Task successfully!","task":task});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    });
};

exports.findAll = (req, res) => {

    var promise = new Promise(function(resolve, reject) { 
        resolve(tasks);
    });
    
    promise
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

exports.findByTitleOrDesc = (req, res) => {
    var promise = new Promise(function(resolve, reject) { 
        var result = tasks.filter(task=>task.title.toLowerCase().includes(req.params.searchTerm)||task.description.toLowerCase().includes(req.params.searchTerm))
        resolve(result);
    });
    
    promise
    .then(result => {
        res.send({message: "Task found succefully",tasks:result});
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving Task with title or Description." + req.params.searchTerm
        });
    });
};

exports.findById = (req, res) => {
    var promise = new Promise(function(resolve, reject) { 
        var result = tasks.filter(task=>task.taskId ==req.params.taskId)
        resolve(result);
    });
    
    promise
    .then(result => {
        if(result.length==0) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });            
        }
        res.send(result[0]);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving Task with id " + req.params.taskId
        });
    });
};

exports.update = (req, res) => {

    var promise = new Promise(function(resolve, reject) { 
        var result = tasks.filter(task=>task.taskId ==req.params.taskId)
        result =  result[0]

        if("completed" in req.body)
            result.completed = req.body.completed
        if(req.body.title)
            result.title = req.body.title
        if(req.body.description)
            result.description = req.body.description
        
        for (var i in tasks) {
            if (tasks[i].taskId == req.params.taskId) {
                tasks[i]= result;
               break; 
            }
        }
        resolve(result);
    });


    promise
    .then(result => {
        if(result.length==0) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send({taskId:req.params.taskId,task:result,message:'Successfully Updated'});
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId,
            error:err
        });
    });
};

exports.toggle = (req, res) => {

    var promise = new Promise(function(resolve, reject) { 
        var result = tasks.filter(task=>task.taskId ==req.params.taskId)
        result =  result[0]
        result.completed = !result.completed

        for (var i in tasks) {
            if (tasks[i].taskId == req.params.taskId) {
                tasks[i]= result;
               break; 
            }
        }
        resolve(result);
    });


    promise
    .then(result => {
        if(result.length==0) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send({taskId:req.params.taskId,task:result,message:'Successfully Updated'});
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId,
            error:err
        });
    });
};

exports.delete = (req, res) => {

    var promise = new Promise(function(resolve,reject){
        result = tasks.filter(task=>task.taskId==req.params.taskId)
        tasks = tasks.filter(task=>task.taskId!=req.params.taskId)
        resolve(result);
    });

    promise
    .then(result => {
        if(result.len==0) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send({taskId:req.params.taskId,message: "Task deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};