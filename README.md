# "task_manager_reactjs" 
### 
This app is created to perform essential operations on task entity. IN this app user firstly create tasks after this user can visit individual task , decide to complete or incomplete the task, also user can delete or update this task. User can search for specific task by keyword and get related tasks that have this keyword in title or description.

# port : 8080

# endpoionts

## add task
### endpoint: http://localhost:8080/api/tasks
### method: POST
### body:{
    "title":"set_task_title",
    "description":"set_task_description"
}

## get all tasks
### endpoint: http://localhost:8080/api/tasks
### method: GET

## get some task by Id
### endpoint: http://localhost:8080/api/tasks/:taskId
### param: taskId (type:number)
### method: GET

## search by title or description
### endpoint: http://localhost:8080/api/tasks/search/:searchTerm
### param: searchTerm (type:text)
### method: GET

## update some task
### endpoint: http://localhost:8080/api/tasks/:taskId
### param: taskId (type:number)
### method: PUT
### body:{
    "title":"new_title",
    "description":"new_description"
}

## toggle some task
### endpoint: http://localhost:8080/api/tasks/toggle/:taskId
### param: taskId (type:number)
### method: PUT

## delete some task
### endpoint: http://localhost:8080/api/tasks/:taskId
### param: taskId (type:number)
### method: DELETE



# content
### task_manager/
    README.md
    app/
        controllers/
            task.controller.js
        models/
            task.model.js
        reducers/
            task.routes.js
    node_modules/
    server.js.js
    package-lock.json
    package.json

# installition 
## This command to install npm
    npm install
## to launch the application run the following command line
    node server.js 
